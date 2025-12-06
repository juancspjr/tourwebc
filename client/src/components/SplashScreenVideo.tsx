import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface SplashScreenVideoProps {
  videoSrc: string;
  logoUrl: string;
  onComplete: () => void;
}

export default function SplashScreenVideo({
  videoSrc,
  logoUrl,
  onComplete,
}: SplashScreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'loading' | 'ready' | 'playing' | 'complete'>('loading');
  const [loadProgress, setLoadProgress] = useState(0);
  const [needsClick, setNeedsClick] = useState(false);
  const [autoplayChecked, setAutoplayChecked] = useState(false);
  const hasCompletedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    const logo = new Image();
    logo.src = logoUrl;
  }, [logoUrl]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (loadProgress >= 100 && !autoplayChecked) {
      checkAutoplayAndStart();
    }
  }, [loadProgress, autoplayChecked]);

  const checkAutoplayAndStart = async () => {
    setAutoplayChecked(true);
    
    const testVideo = document.createElement('video');
    testVideo.muted = true;
    testVideo.playsInline = true;
    testVideo.src = videoSrc;

    try {
      await testVideo.play();
      testVideo.pause();
      testVideo.remove();
      
      startVideoAutomatic();
    } catch {
      testVideo.remove();
      setNeedsClick(true);
      setPhase('ready');
    }
  };

  const startVideoAutomatic = () => {
    const video = videoRef.current;
    if (!video) {
      handleComplete();
      return;
    }

    video.muted = false;
    video.volume = 0.8;

    video.play()
      .then(() => {
        setPhase('playing');
        setNeedsClick(false);
      })
      .catch(() => {
        setNeedsClick(true);
        setPhase('ready');
      });
  };

  const handleManualStart = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      handleComplete();
      return;
    }

    video.muted = false;
    video.volume = 0.8;

    video.play()
      .then(() => {
        setPhase('playing');
        setNeedsClick(false);
      })
      .catch(() => {
        handleComplete();
      });
  }, []);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    setPhase('complete');

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => handleComplete();
    const handleError = () => handleComplete();

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [handleComplete]);

  if (phase === 'complete') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: 1,
        transition: 'opacity 400ms ease-out',
      }}
      role="presentation"
      data-testid="splash-screen-video"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: phase === 'playing' ? 1 : 0,
          transition: 'opacity 500ms ease-out',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
        data-testid="video-splash"
      />

      {(phase === 'loading' || phase === 'ready') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]">
          <div className="relative flex flex-col items-center gap-6">
            <img
              src={logoUrl}
              alt="Rio Trip Vibes"
              className="w-40 h-auto object-contain"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3))',
              }}
            />
            
            <p className="text-white/80 text-lg font-medium">
              {t('splash.tagline')}
            </p>

            {phase === 'loading' && (
              <div className="mt-4 flex flex-col items-center gap-3 w-48">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <p className="text-white/60 text-sm">{t('splash.loading', 'Cargando...')}</p>
              </div>
            )}

            {phase === 'ready' && needsClick && (
              <button
                onClick={handleManualStart}
                className="mt-4 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-lg transition-all duration-200 flex items-center gap-3 border border-white/30"
                data-testid="button-play-video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t('splash.tapToPlay', 'Toca para comenzar')}
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={handleComplete}
        className="absolute bottom-6 right-6 text-white/50 hover:text-white/80 text-sm transition-colors"
        data-testid="button-skip-splash"
      >
        {t('splash.skip', 'Click para saltar')}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
