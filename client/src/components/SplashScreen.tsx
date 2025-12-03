import { useEffect, useState, useCallback } from "react";
import logoImage from "@assets/fondtrans_1764705052522.png";
import { Plane } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 1800 }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const handleSkip = useCallback(() => {
    if (!isExiting) {
      setIsExiting(true);
      setTimeout(onComplete, 300);
    }
  }, [isExiting, onComplete]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleSkip();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`splash-screen ${isExiting ? "splash-exit" : ""}`}
      onClick={handleSkip}
      role="button"
      tabIndex={0}
      aria-label="Pantalla de bienvenida - Click para saltar"
      data-testid="splash-screen"
    >
      <div className="splash-content">
        <div className="splash-logo-container">
          <div className="splash-orbit-container">
            <div className="splash-airplane-orbit">
              <Plane className="splash-airplane" />
            </div>
          </div>
          <img
            src={logoImage}
            alt="Rio Trip Vibes"
            className="splash-logo"
          />
        </div>
        
        <p className="splash-tagline">
          Descubre tu próxima aventura
        </p>
        
        <div className="splash-loader">
          <div className="splash-loader-line" />
        </div>
      </div>
      
      <span className="splash-skip-hint">
        Click para saltar
      </span>

      <style>{`
        .splash-screen {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, 
            hsl(209 61% 42%) 0%, 
            hsl(192 100% 46%) 50%,
            hsl(209 61% 35%) 100%
          );
          cursor: pointer;
          animation: splashFadeIn 400ms ease-out forwards;
          overflow: hidden;
        }

        .dark .splash-screen {
          background: linear-gradient(135deg, 
            hsl(209 35% 15%) 0%, 
            hsl(192 80% 30%) 50%,
            hsl(209 35% 12%) 100%
          );
        }

        .splash-screen.splash-exit {
          animation: splashFadeOut 300ms ease-in forwards;
        }

        .splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .splash-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 220px;
          height: 220px;
          animation: logoFloat 400ms ease-out 200ms backwards;
        }

        .splash-orbit-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        .splash-airplane-orbit {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: orbitRotate 2.5s linear infinite;
          transform-origin: center center;
        }

        .splash-airplane {
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -14px;
          margin-top: -5px;
          width: 28px;
          height: 28px;
          color: white;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4));
          animation: airplaneAppear 400ms ease-out 300ms backwards;
          transform: rotate(90deg);
        }

        .splash-logo {
          width: 160px;
          height: auto;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
          animation: logoScale 400ms ease-out 200ms backwards;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .splash-tagline {
          font-family: "Montserrat", sans-serif;
          font-size: 24px;
          font-weight: 500;
          color: white;
          text-align: center;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          animation: taglineSlideUp 300ms ease-out 600ms backwards;
          margin: 0;
          padding: 0 1rem;
        }

        .splash-loader {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          animation: loaderAppear 200ms ease-out 900ms backwards;
        }

        .splash-loader-line {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, 
            hsl(21 100% 64%) 0%, 
            hsl(33 100% 70%) 100%
          );
          border-radius: 4px;
          animation: loaderProgress 1200ms ease-out 900ms forwards;
        }

        .splash-skip-hint {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          animation: hintFadeIn 400ms ease-out 1000ms backwards;
        }

        @keyframes splashFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes splashFadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes logoScale {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes taglineSlideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes loaderAppear {
          from {
            opacity: 0;
            transform: scaleX(0.8);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes loaderProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes hintFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes airplaneAppear {
          from {
            opacity: 0;
            transform: translateX(-50%) rotate(45deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) rotate(45deg) scale(1);
          }
        }

        @media (max-width: 768px) {
          .splash-logo-container {
            width: 180px;
            height: 180px;
          }

          .splash-logo {
            width: 130px;
          }

          .splash-airplane {
            width: 24px;
            height: 24px;
            margin-left: -12px;
            margin-top: -4px;
          }

          .splash-tagline {
            font-size: 18px;
          }

          .splash-loader {
            width: 150px;
          }

          .splash-skip-hint {
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .splash-logo-container {
            width: 160px;
            height: 160px;
          }

          .splash-logo {
            width: 110px;
          }

          .splash-airplane {
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -3px;
          }

          .splash-tagline {
            font-size: 16px;
          }

          .splash-loader {
            width: 120px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-screen,
          .splash-logo-container,
          .splash-logo,
          .splash-tagline,
          .splash-loader,
          .splash-loader-line,
          .splash-skip-hint,
          .splash-airplane-orbit,
          .splash-airplane {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
