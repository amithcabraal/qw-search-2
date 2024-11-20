import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

type GameOverOverlayProps = {
  onNewGame: () => void;
  foundWords: Set<string>;
};

export function GameOverOverlay({ onNewGame, foundWords }: GameOverOverlayProps) {
  React.useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-bounce-in">
        <div className="text-center">
          <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
          <p className="text-gray-600 mb-4">
            You found all {foundWords.size} words!
          </p>
          <button
            onClick={onNewGame}
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}