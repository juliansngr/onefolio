export default function WaitinglistStyles() {
  return (
    <style jsx>{`
      @keyframes gradient-x {
        0%,
        100% {
          transform: translateX(0%);
        }
        50% {
          transform: translateX(100%);
        }
      }
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      @keyframes glow {
        0%,
        100% {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        50% {
          box-shadow: 0 0 40px rgba(147, 51, 234, 0.7);
        }
      }
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      .animate-draw-line {
        animation: draw-line 1.2s cubic-bezier(0.25, 0.1, 0.01, 1) 0.8s both;
      }
      @keyframes draw-line {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }
      .animate-minecraft-blink {
        animation: minecraft-blink 1.5s infinite;
      }
      @keyframes minecraft-blink {
        0%,
        50% {
          opacity: 1;
        }
        51%,
        100% {
          opacity: 0;
        }
      }
      .animate-minecraft-scale {
        animation: minecraft-scale 2s ease-in-out infinite;
      }
      @keyframes minecraft-scale {
        0%,
        100% {
          transform: rotate(-12deg) scale(1);
        }
        50% {
          transform: rotate(-12deg) scale(1.15);
        }
      }
      @keyframes minecraftPulse {
        0%,
        100% {
          transform: rotate(-12deg) scale(1);
        }
        50% {
          transform: rotate(-12deg) scale(1.2);
        }
      }
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 4s ease infinite;
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.6s ease-out;
      }
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }
      .animate-shimmer {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      .animation-delay-200 {
        animation-delay: 0.2s;
        animation-fill-mode: both;
      }
      .animation-delay-400 {
        animation-delay: 0.4s;
        animation-fill-mode: both;
      }
      .animation-delay-600 {
        animation-delay: 0.6s;
        animation-fill-mode: both;
      }
      .animation-delay-800 {
        animation-delay: 0.8s;
        animation-fill-mode: both;
      }
      .animation-delay-500 {
        animation-delay: 0.5s;
        animation-fill-mode: both;
      }
      .animation-delay-1000 {
        animation-delay: 1s;
        animation-fill-mode: both;
      }
      .animation-delay-1200 {
        animation-delay: 1.2s;
        animation-fill-mode: both;
      }
      .card-hover-effect {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .card-hover-effect:hover {
        transform: translateY(-8px) scale(1.02);
      }
      .glassmorphism {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      .text-glow {
        text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
      }
      .shadow-3xl {
        box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
      }
      .hover\\:shadow-3xl:hover {
        box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
      }
    `}</style>
  );
}
