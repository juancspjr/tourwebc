import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenVideoProps {
  videoSrc: string;
  videoDuration?: number;
  onComplete: () => void;
}

export default function SplashScreenVideo({
  videoSrc,
  videoDuration = 5000,
  onComplete,
}: SplashScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const hasCompletedRef = useRef(false);
  const playAttemptRef = useRef(0);
  const { t } = useTranslation();

  const handleVideoComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 300);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (!isExiting) {
      handleVideoComplete();
    }
  }, [isExiting, handleVideoComplete]);

  const tryPlayVideo = useCallback((video: HTMLVideoElement) => {
    if (hasCompletedRef.current) return;
    
    video.muted = true;
    video.volume = 0;
    
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoReady(true);
        })
        .catch(() => {
          playAttemptRef.current += 1;
          if (playAttemptRef.current < 3) {
            setTimeout(() => tryPlayVideo(video), 100);
          } else {
            handleVideoComplete();
          }
        });
    }
  }, [handleVideoComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    (video as any).webkitPlaysInline = true;

    const handleLoadedData = () => {
      tryPlayVideo(video);
    };

    const handleCanPlayThrough = () => {
      tryPlayVideo(video);
    };

    const handleVideoEnd = () => {
      handleVideoComplete();
    };

    const handleVideoError = () => {
      handleVideoComplete();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);

    if (video.readyState >= 3) {
      tryPlayVideo(video);
    } else {
      video.load();
    }

    const timeoutId = setTimeout(() => {
      if (!hasCompletedRef.current) {
        handleVideoComplete();
      }
    }, videoDuration + 1000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      clearTimeout(timeoutId);
    };
  }, [videoDuration, handleVideoComplete, tryPlayVideo]);

  useEffect(() => {
    const handleKeyDown = () => {
      handleSkip();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer`}
      style={{
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 300ms ease-out',
      }}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label={t('splash.ariaLabel')}
      data-testid="splash-screen-video"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{
          display: videoReady ? 'block' : 'none',
        }}
        data-testid="video-splash"
      />

      {!videoReady && (
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)] flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-sm text-white/70">{t('splash.tagline')}</p>
          </div>
        </div>
      )}

      <span 
        className="absolute bottom-6 right-6 text-xs text-white/50"
        data-testid="text-skip-hint"
      >
        {t('splash.skipHint')}
      </span>
    </div>
  );
}
