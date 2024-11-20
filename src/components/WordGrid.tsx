import React, { useState } from 'react';
import { GridCell } from '../types';
import clsx from 'clsx';

type WordGridProps = {
  grid: GridCell[][];
  foundWords: Set<string>;
  onWordFound: (word: string) => void;
};

type Position = {
  x: number;
  y: number;
};

export function WordGrid({ grid, foundWords, onWordFound }: WordGridProps) {
  const [startPos, setStartPos] = useState<Position | null>(null);
  const [selectedCells, setSelectedCells] = useState<Position[]>([]);

  const getWordFromPositions = (start: Position, end: Position): string => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.max(Math.abs(dx), Math.abs(dy)) + 1;
    let word = '';
    
    // Normalize direction
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);

    for (let i = 0; i < length; i++) {
      const x = start.x + (stepX * i);
      const y = start.y + (stepY * i);
      word += grid[y][x].letter;
    }

    return word;
  };

  const isValidLine = (start: Position, end: Position): boolean => {
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    return dx === 0 || dy === 0 || dx === dy;
  };

  const getCellsBetween = (start: Position, end: Position): Position[] => {
    const cells: Position[] = [];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.max(Math.abs(dx), Math.abs(dy)) + 1;
    
    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);

    for (let i = 0; i < length; i++) {
      cells.push({
        x: start.x + (stepX * i),
        y: start.y + (stepY * i)
      });
    }

    return cells;
  };

  const handleCellClick = (x: number, y: number) => {
    if (!startPos) {
      setStartPos({ x, y });
      setSelectedCells([{ x, y }]);
    } else {
      if (isValidLine(startPos, { x, y })) {
        const cells = getCellsBetween(startPos, { x, y });
        setSelectedCells(cells);
        
        const word = getWordFromPositions(startPos, { x, y });
        const reversedWord = word.split('').reverse().join('');
        
        if (grid[startPos.y][startPos.x].words.includes(word)) {
          onWordFound(word);
        } else if (grid[startPos.y][startPos.x].words.includes(reversedWord)) {
          onWordFound(reversedWord);
        }
      }
      setStartPos(null);
      setTimeout(() => setSelectedCells([]), 500);
    }
  };

  const isCellSelected = (x: number, y: number): boolean => {
    return selectedCells.some(pos => pos.x === x && pos.y === y);
  };

  const isCellFound = (cell: GridCell): boolean => {
    return cell.words.some(word => foundWords.has(word));
  };

  return (
    <div className="grid grid-cols-12 gap-1 p-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {grid.map((row, y) => (
        row.map((cell, x) => (
          <button
            key={`${x}-${y}`}
            onClick={() => handleCellClick(x, y)}
            className={clsx(
              'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center',
              'text-lg font-bold rounded transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-400',
              {
                'bg-blue-500 text-white': isCellSelected(x, y),
                'bg-green-200 text-green-800': !isCellSelected(x, y) && isCellFound(cell),
                'bg-gray-50 hover:bg-blue-100': !isCellSelected(x, y) && !isCellFound(cell)
              }
            )}
          >
            {cell.letter}
          </button>
        ))
      ))}
    </div>
  );
}