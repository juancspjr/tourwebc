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
          <div className="splash-3d-scene">
            <div className="splash-airplane-3d">
              <div className="airplane-comet-trail" />
              <div className="airplane-comet-trail trail-2" />
              <div className="airplane-comet-trail trail-3" />
              <div className="airplane-body">
                <Plane className="splash-airplane-icon" />
              </div>
              <div className="airplane-glow" />
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

        .splash-3d-scene {
          position: absolute;
          inset: -60px;
          width: calc(100% + 120px);
          height: calc(100% + 120px);
          pointer-events: none;
          z-index: 10;
          perspective: 800px;
          perspective-origin: center center;
        }

        .splash-airplane-3d {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: fly3D 3s ease-in-out infinite;
        }

        .airplane-body {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateZ(80px) rotateY(-20deg);
          transform-style: preserve-3d;
        }

        .splash-airplane-icon {
          width: 36px;
          height: 36px;
          color: white;
          filter: 
            drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))
            drop-shadow(0 0 20px rgba(255, 200, 100, 0.6))
            drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          transform: rotate(135deg);
          animation: airplaneGlow 0.5s ease-in-out infinite alternate;
        }

        .airplane-glow {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(255, 200, 100, 0.9) 0%, rgba(255, 150, 50, 0.5) 40%, transparent 70%);
          border-radius: 50%;
          filter: blur(4px);
          animation: glowPulse 0.3s ease-in-out infinite alternate;
        }

        .airplane-comet-trail {
          position: absolute;
          top: 22px;
          left: 50%;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 200, 100, 0.1) 20%,
            rgba(255, 180, 80, 0.4) 50%,
            rgba(255, 150, 50, 0.8) 80%,
            rgba(255, 255, 255, 0.9) 100%
          );
          border-radius: 4px;
          transform: translateX(-100%) translateZ(80px);
          filter: blur(2px);
          animation: trailShimmer 0.8s ease-in-out infinite;
        }

        .airplane-comet-trail.trail-2 {
          top: 18px;
          width: 60px;
          height: 2px;
          opacity: 0.7;
          filter: blur(3px);
          animation-delay: 0.1s;
        }

        .airplane-comet-trail.trail-3 {
          top: 26px;
          width: 50px;
          height: 2px;
          opacity: 0.5;
          filter: blur(4px);
          animation-delay: 0.2s;
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

        @keyframes fly3D {
          0% {
            transform: rotateZ(0deg) rotateX(15deg);
          }
          25% {
            transform: rotateZ(90deg) rotateX(-10deg) scale(1.1);
          }
          50% {
            transform: rotateZ(180deg) rotateX(15deg) scale(0.9);
          }
          75% {
            transform: rotateZ(270deg) rotateX(-10deg) scale(1.05);
          }
          100% {
            transform: rotateZ(360deg) rotateX(15deg);
          }
        }

        @keyframes airplaneGlow {
          from {
            filter: 
              drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))
              drop-shadow(0 0 20px rgba(255, 200, 100, 0.6))
              drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          }
          to {
            filter: 
              drop-shadow(0 0 15px rgba(255, 255, 255, 1))
              drop-shadow(0 0 30px rgba(255, 200, 100, 0.9))
              drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
          }
        }

        @keyframes glowPulse {
          from {
            opacity: 0.8;
            transform: translateX(-50%) scale(1);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1.3);
          }
        }

        @keyframes trailShimmer {
          0% {
            opacity: 0.6;
            width: 80px;
          }
          50% {
            opacity: 1;
            width: 100px;
          }
          100% {
            opacity: 0.6;
            width: 80px;
          }
        }

        @media (max-width: 768px) {
          .splash-logo-container {
            width: 180px;
            height: 180px;
          }

          .splash-3d-scene {
            inset: -50px;
            width: calc(100% + 100px);
            height: calc(100% + 100px);
          }

          .splash-logo {
            width: 130px;
          }

          .splash-airplane-icon {
            width: 30px;
            height: 30px;
          }

          .airplane-comet-trail {
            width: 60px;
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

          .splash-3d-scene {
            inset: -40px;
            width: calc(100% + 80px);
            height: calc(100% + 80px);
          }

          .splash-logo {
            width: 110px;
          }

          .splash-airplane-icon {
            width: 26px;
            height: 26px;
          }

          .airplane-comet-trail {
            width: 50px;
          }

          .airplane-glow {
            width: 16px;
            height: 16px;
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
          .splash-airplane-3d,
          .splash-airplane-icon,
          .airplane-glow,
          .airplane-comet-trail {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
