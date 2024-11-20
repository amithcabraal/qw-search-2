import React from 'react';
import { X, MousePointerClick } from 'lucide-react';

type SplashScreenProps = {
  onDismiss: () => void;
};

export function SplashScreen({ onDismiss }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">How to Play</h2>
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <div className="flex items-start gap-3">
            <MousePointerClick className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <p>Click the first letter of a word you've found, then click the last letter.</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded flex-shrink-0 mt-1" />
            <p>Selected letters will be highlighted in blue.</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-200 rounded flex-shrink-0 mt-1" />
            <p>Found words will remain highlighted in green.</p>
          </div>
          
          <p className="italic">Words can be placed horizontally, vertically, or diagonally, and may be written forwards or backwards.</p>
        </div>
        
        <button
          onClick={onDismiss}
          className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}