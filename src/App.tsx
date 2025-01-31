import { useState, useCallback } from 'react';
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

export default function LovePage() {
  const [showMessage, setShowMessage] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const revealMessage = () => {
    if (!showMessage) {
      setShowMessage(true);
      setRunConfetti(true);
      setTimeout(() => setRunConfetti(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-red-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            {['❤️', '💖', '💘', '💝', '💕'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {runConfetti && (
        <Particles
          id="confetti"
          init={particlesInit}
          options={{
            preset: "confetti",
            emitters: {
              position: { x: 50, y: 50 },
              rate: { quantity: 40, delay: 0.03 },
              size: { width: 100, height: 50 },
              spread: 360
            },
            particles: {
              shape: { type: "heart" },
              color: { value: ["#FF69B4", "#FF1493", "#DB7093"] },
              move: {
                speed: 50,
                outModes: "bounce",
                path: {
                  enable: true,
                },
                drift: { min: -2, max: 2 }
              },
              rotate: { value: { min: 0, max: 360 } },
              wobble: { distance: 20, enable: true }
            }
          }}
          className="absolute inset-0 z-1"
        />
      )}

      <div className="max-w-2xl text-center space-y-6 z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-rose-600 animate-float group relative">
          💖 My Love 💖
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-20 animate-shine pointer-events-none" />
        </h1>

        <button
          onClick={revealMessage}
          className={`bg-rose-600 hover:bg-rose-700 text-white px-12 py-5 rounded-full text-2xl shadow-2xl transition-all transform ${
            showMessage
              ? 'animate-heartbeat ring-4 ring-rose-400/30'
              : 'hover:scale-110 hover:rotate-3'
          } relative overflow-hidden`}
        >
          <span className="relative z-10">
            {showMessage ? '💖 Forever Yours 💖' : 'Reveal My Heart'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-300/20 animate-pulse" />
        </button>

        {showMessage && (
          <div className="space-y-6 animate-fall-in">
            <p className="text-2xl md:text-3xl text-gray-800 font-medium bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text">
              You Are My Universe...
            </p>
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-rose-100 transform transition hover:scale-[1.02]">
              <p className="text-gray-700 mb-6 text-xl leading-relaxed animate-typewriter font-serif italic">
                "In your eyes, I found my home<br />
                In your heart, I found my peace<br />
                With every beat, my love grows<br />
                Forever yours, my soul's release ✨"
              </p>
              <div className="flex justify-center space-x-3 text-3xl">
                {['🌹', '🌌', '💫', '🕊️', '💍'].map((emoji, i) => (
                  <span
                    key={i}
                    className="animate-float hover:animate-spin cursor-pointer"
                    style={{
                      animationDelay: `${i * 200}ms`,
                      animationDuration: `${2 + i}s`,
                    }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-10 text-gray-600 animate-fade-in-delayed">
          <p className="text-sm font-light tracking-widest">
            By you gold fish 💘
          </p>
        </footer>
      </div>
    </div>
  );
}
