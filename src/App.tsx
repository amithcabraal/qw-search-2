import React, { useState, useEffect } from 'react';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { WordGrid } from './components/WordGrid';
import { WordList } from './components/WordList';
import { SplashScreen } from './components/SplashScreen';
import { GameOverOverlay } from './components/GameOverOverlay';
import { generateWordSearch } from './utils/wordSearch';
import { categories } from './data/categories';
import { GridCell } from './types';

const GRID_SIZE = 12;
const SPLASH_SCREEN_KEY = 'wordSearchSplashDismissed';

export default function App() {
  const [category, setCategory] = useState<keyof typeof categories>('premierLeague');
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem(SPLASH_SCREEN_KEY);
  });

  useEffect(() => {
    generateNewPuzzle();
  }, [category]);

  const generateNewPuzzle = () => {
    const { grid: newGrid, placements } = generateWordSearch(categories[category]);
    setGrid(newGrid);
    setWords(categories[category]);
    setFoundWords(new Set());
  };

  const handleWordFound = (word: string) => {
    if (words.includes(word)) {
      setFoundWords(new Set([...foundWords, word]));
    }
  };

  const handleDismissSplash = () => {
    localStorage.setItem(SPLASH_SCREEN_KEY, 'true');
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="w-10 h-10 text-indigo-600" />
            Word Search Generator
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as keyof typeof categories)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="premierLeague">Premier League Teams</option>
              <option value="elements">Periodic Elements</option>
              <option value="countries">Countries</option>
              <option value="athletes">Famous Athletes</option>
            </select>
            
            <button
              onClick={generateNewPuzzle}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              New Puzzle
            </button>
          </div>
        </div>

        <WordGrid
          grid={grid}
          foundWords={foundWords}
          onWordFound={handleWordFound}
        />

        <WordList
          words={words}
          foundWords={foundWords}
        />

        {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}
        
        {foundWords.size === words.length && words.length > 0 && (
          <GameOverOverlay
            foundWords={foundWords}
            onNewGame={generateNewPuzzle}
          />
        )}
      </div>
    </div>
  );
}