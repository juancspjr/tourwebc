import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenVideoProps {
  videoSrc: string;
  audioSrc?: string;
  videoDuration?: number;
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreenVideo({
  videoSrc,
  audioSrc,
  videoDuration = 5000,
  logoUrl,
  onComplete,
}: SplashScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [audioReady, setAudioReady] = useState(!audioSrc);
  const [allReady, setAllReady] = useState(false);
  const hasCompletedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    const preloadResources = async () => {
      try {
        if (logoUrl) {
          const logo = new Image();
          logo.src = logoUrl;
        }

        const video = videoRef.current;
        if (video) {
          video.preload = 'metadata';
        }

        if (audioSrc && audioRef.current) {
          const audio = audioRef.current;
          audio.preload = 'auto';
          audio.load();
        }
      } catch (err) {
        console.error('Preload error:', err);
      }
    };

    preloadResources();
  }, [logoUrl, audioSrc]);

  const forceAudioPlayback = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      const audioElement = audioRef.current;
      audioElement.volume = 0.8;

      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing with sound');
          })
          .catch((err) => {
            console.warn('Autoplay blocked, waiting for user interaction:', err);
            const playOnInteraction = () => {
              audioElement.play().catch(() => {});
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
          });
      }
    } catch (err) {
      console.error('Audio error:', err);
    }
  }, []);

  const syncVideoWithAudio = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    const handleVideoTimeUpdate = () => {
      if (Math.abs(video.currentTime - audio.currentTime) > 0.1) {
        audio.currentTime = video.currentTime;
      }
    };

    video.addEventListener('timeupdate', handleVideoTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleVideoTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const handleVideoCanPlay = () => {
      console.log('Video ready');
      setVideoReady(true);
    };

    const handleAudioCanPlayThrough = () => {
      console.log('Audio ready');
      setAudioReady(true);
    };

    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.addEventListener('canplay', handleVideoCanPlay);
      if (video.readyState >= 3) {
        setVideoReady(true);
      }
    }

    if (audio) {
      audio.addEventListener('canplaythrough', handleAudioCanPlayThrough);
      if (audio.readyState >= 4) {
        setAudioReady(true);
      }
    }

    return () => {
      if (video) {
        video.removeEventListener('canplay', handleVideoCanPlay);
      }
      if (audio) {
        audio.removeEventListener('canplaythrough', handleAudioCanPlayThrough);
      }
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !audioReady) return;

    console.log('Starting playback');
    setAllReady(true);

    const video = videoRef.current;
    if (!video) return;

    const playVideoPromise = video.play();
    if (playVideoPromise !== undefined) {
      playVideoPromise.catch((err) => {
        console.warn('Video autoplay fallback:', err);
        handleVideoComplete();
      });
    }

    forceAudioPlayback();

    const cleanup = syncVideoWithAudio();
    return cleanup;
  }, [videoReady, audioReady, forceAudioPlayback, syncVideoWithAudio]);

  const handleVideoComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    console.log('Transitioning out');

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsVisible(false);

    setTimeout(() => {
      onComplete();
    }, 300);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (!hasCompletedRef.current) {
      handleVideoComplete();
    }
  }, [handleVideoComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => handleVideoComplete();
    const handleVideoError = () => {
      console.error('Video error');
      handleVideoComplete();
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);

    const timeoutId = setTimeout(() => {
      if (!hasCompletedRef.current) {
        console.warn('Timeout reached');
        handleVideoComplete();
      }
    }, videoDuration + 1000);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      clearTimeout(timeoutId);
    };
  }, [videoDuration, handleVideoComplete]);

  useEffect(() => {
    const handleKeyDown = () => {
      handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease-out',
      }}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label={t('splash.ariaLabel')}
      data-testid="splash-screen-video"
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: '#000000',
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay={false}
          muted={true}
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            display: allReady ? 'block' : 'none',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          data-testid="video-splash"
        />

        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="auto"
            playsInline
            style={{ display: 'none' }}
          />
        )}

        {!allReady && logoUrl && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]"
            style={{
              opacity: allReady ? 0 : 1,
              transition: 'opacity 300ms ease-out',
            }}
          >
            <div className="relative flex flex-col items-center gap-4">
              <img
                src={logoUrl}
                alt="Loading"
                className="w-32 h-auto object-contain"
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3))',
                }}
              />
              <div
                className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                style={{
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p className="text-white/70 text-sm">{t('splash.tagline')}</p>
            </div>
          </div>
        )}

        {!allReady && !logoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]">
            <div className="flex flex-col items-center gap-4">
              <div 
                className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                style={{
                  animation: 'spin 1s linear infinite',
                }}
              />
              <p className="text-white text-sm">{t('splash.tagline')}</p>
            </div>
          </div>
        )}
      </div>

      <span 
        className="absolute bottom-6 right-6 text-xs text-white/50"
        data-testid="text-skip-hint"
      >
        {t('splash.skipHint')}
      </span>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
