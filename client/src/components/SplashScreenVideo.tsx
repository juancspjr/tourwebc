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
  const [phase, setPhase] = useState<'waiting' | 'playing' | 'complete'>('waiting');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const hasCompletedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    const logo = new Image();
    logo.src = logoUrl;

    const video = videoRef.current;
    if (video) {
      video.preload = 'auto';
      video.load();
    }
  }, [logoUrl, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      console.log('Video loaded and ready');
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      console.log('Video ended');
      handleComplete();
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      handleComplete();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const handleComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    console.log('Splash complete');
    setPhase('complete');

    const video = videoRef.current;
    if (video) {
      video.pause();
    }

    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  const handleTapToPlay = useCallback(() => {
    if (phase !== 'waiting') return;

    const video = videoRef.current;
    if (!video) {
      handleComplete();
      return;
    }

    video.muted = false;
    video.volume = 0.8;

    video.play()
      .then(() => {
        console.log('Video playing with sound');
        setPhase('playing');
      })
      .catch((err) => {
        console.error('Play failed:', err);
        handleComplete();
      });
  }, [phase, handleComplete]);

  if (phase === 'complete') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: phase === 'complete' ? 0 : 1,
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

      {phase === 'waiting' && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)] cursor-pointer"
          onClick={handleTapToPlay}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleTapToPlay()}
          data-testid="button-tap-to-play"
        >
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

            {videoLoaded ? (
              <button
                onClick={handleTapToPlay}
                className="mt-4 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-lg transition-all duration-200 flex items-center gap-3 border border-white/30"
                data-testid="button-play-video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                {t('splash.tapToPlay', 'Toca para comenzar')}
              </button>
            ) : (
              <div className="mt-4 flex flex-col items-center gap-3">
                <div
                  className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full"
                  style={{ animation: 'spin 1s linear infinite' }}
                />
                <p className="text-white/60 text-sm">{t('splash.loading', 'Cargando...')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
