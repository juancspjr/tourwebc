import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenVideoProps {
  videoSrc: string;
  logoUrl?: string;
  onComplete: () => void;
}

export default function SplashScreenVideo({
  videoSrc,
  logoUrl,
  onComplete,
}: SplashScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const hasCompletedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (logoUrl) {
      const logo = new Image();
      logo.src = logoUrl;
    }
  }, [logoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video can play');
      setVideoReady(true);
    };

    const handlePlaying = () => {
      console.log('Video is playing');
      setIsPlaying(true);
      setNeedsInteraction(false);
    };

    const handleEnded = () => {
      console.log('Video ended naturally');
      handleComplete();
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      handleComplete();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    if (video.readyState >= 3) {
      setVideoReady(true);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    if (!videoReady) return;

    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = false;
        video.volume = 0.8;
        await video.play();
        console.log('Autoplay with sound succeeded');
      } catch (err) {
        console.warn('Autoplay with sound blocked, trying muted:', err);
        try {
          video.muted = true;
          await video.play();
          console.log('Muted autoplay succeeded - need interaction for sound');
          setNeedsInteraction(true);
        } catch (mutedErr) {
          console.warn('Even muted autoplay blocked:', mutedErr);
          setNeedsInteraction(true);
        }
      }
    };

    attemptPlay();
  }, [videoReady]);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    console.log('Splash complete - transitioning out');

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    setIsVisible(false);

    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  const handleUserInteraction = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (needsInteraction) {
      video.muted = false;
      video.volume = 0.8;
      
      if (video.paused) {
        video.play().catch(console.error);
      }
      
      setNeedsInteraction(false);
      console.log('User enabled sound');
    }
  }, [needsInteraction]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 400ms ease-out',
      }}
      onClick={handleUserInteraction}
      role="presentation"
      data-testid="splash-screen-video"
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ backgroundColor: '#000000' }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 300ms ease-out',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          data-testid="video-splash"
        />

        {(!isPlaying || needsInteraction) && logoUrl && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]"
            style={{
              opacity: isPlaying && !needsInteraction ? 0 : 1,
              transition: 'opacity 300ms ease-out',
              pointerEvents: needsInteraction ? 'auto' : 'none',
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
              
              {needsInteraction ? (
                <button
                  onClick={handleUserInteraction}
                  className="mt-4 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-200 flex items-center gap-2"
                  data-testid="button-enable-sound"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('splash.tapToPlay', 'Toca para reproducir con sonido')}
                </button>
              ) : (
                <>
                  <div
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  <p className="text-white/70 text-sm">{t('splash.tagline')}</p>
                </>
              )}
            </div>
          </div>
        )}

        {!logoUrl && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]">
            <div className="flex flex-col items-center gap-4">
              {needsInteraction ? (
                <button
                  onClick={handleUserInteraction}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-200 flex items-center gap-2"
                  data-testid="button-enable-sound-alt"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('splash.tapToPlay', 'Toca para reproducir con sonido')}
                </button>
              ) : (
                <>
                  <div 
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
                    style={{ animation: 'spin 1s linear infinite' }}
                  />
                  <p className="text-white text-sm">{t('splash.tagline')}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
