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
  const [phase, setPhase] = useState<'loading' | 'ready' | 'transitioning' | 'playing' | 'complete'>('loading');
  const [loadProgress, setLoadProgress] = useState(0);
  const [needsClick, setNeedsClick] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  const hasCompletedRef = useRef(false);
  const autoplayCheckedRef = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    const logo = new Image();
    logo.src = logoUrl;
    
    setTimeout(() => setShowContent(true), 100);
  }, [logoUrl]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (loadProgress >= 100 && !autoplayCheckedRef.current) {
      autoplayCheckedRef.current = true;
      checkAutoplayAndStart();
    }
  }, [loadProgress]);

  const checkAutoplayAndStart = async () => {
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
        setPhase('transitioning');
        setFadeOutLoading(true);
        setTimeout(() => {
          setPhase('playing');
        }, 800);
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
        setPhase('transitioning');
        setFadeOutLoading(true);
        setTimeout(() => {
          setPhase('playing');
        }, 800);
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
          opacity: (phase === 'transitioning' || phase === 'playing') ? 1 : 0,
          transition: 'opacity 1000ms ease-out',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          objectPosition: 'center center',
        }}
        data-testid="video-splash"
      />

      {(phase === 'loading' || phase === 'ready' || phase === 'transitioning') && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[hsl(209,61%,42%)] via-[hsl(192,100%,46%)] to-[hsl(209,61%,35%)]"
          style={{
            opacity: fadeOutLoading ? 0 : (showContent ? 1 : 0),
            transition: 'opacity 1000ms ease-out',
            pointerEvents: fadeOutLoading ? 'none' : 'auto',
          }}
        >
          <img
            src={logoUrl}
            alt="Rio Trip Vibes"
            className="absolute left-1/2 object-contain"
            style={{
              width: '180px',
              height: 'auto',
              top: '22%',
              transform: 'translateX(-50%)',
              opacity: showContent ? 1 : 0,
              transition: 'opacity 800ms ease-out',
              filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3))',
            }}
          />
          
          <div 
            className="absolute left-1/2 flex flex-col items-center text-center"
            style={{
              top: '52%',
              transform: 'translateX(-50%)',
            }}
          >
            <p 
              className="text-white/80 text-xl font-medium"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms',
              }}
            >
              {t('splash.tagline')}
            </p>

            <div 
              className="mt-8 w-56 flex flex-col items-center gap-5"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 800ms ease-out 400ms, transform 800ms ease-out 400ms',
              }}
            >
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              {phase === 'ready' && needsClick && (
                <button
                  onClick={handleManualStart}
                  className="px-10 py-5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-xl transition-all duration-300 flex items-center justify-center gap-4 border border-white/30 whitespace-nowrap"
                  style={{
                    animation: 'fadeInUp 500ms ease-out forwards',
                  }}
                  data-testid="button-play-video"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('splash.tapToPlay')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleComplete}
        className="absolute bottom-6 right-6 text-white/50 hover:text-white/80 text-sm transition-colors z-10"
        data-testid="button-skip-splash"
      >
        {t('splash.skip', 'Click para saltar')}
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
