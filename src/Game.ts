import type { Game } from 'boardgame.io';

export interface GameState {
  cells: (string | null)[];
}

export const ArtefactoAbsurdo: Game<GameState> = {
  setup: () => ({
    cells: Array(25).fill(null).map((_, i) => {
        if (i === 0) return 'P0';
        if (i === 24) return 'P1';
        if (Math.random() < 0.2) return 'A'; // Artifact
        return null;
    }),
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    moveSafe: ({ G, ctx }, id: number) => {
        const currentPlayer = `P${ctx.currentPlayer}`;
        const currentIndex = G.cells.findIndex(c => c === currentPlayer);
        
        // Check if move is adjacent
        const currX = currentIndex % 5;
        const currY = Math.floor(currentIndex / 5);
        const targetX = id % 5;
        const targetY = Math.floor(id / 5);
        
        const dist = Math.abs(currX - targetX) + Math.abs(currY - targetY);
        if (dist === 1) {
            G.cells[currentIndex] = null;
            G.cells[id] = currentPlayer;
        } else {
            return 'INVALID_MOVE';
        }
    },
    moveAbsurd: ({ G, ctx }) => {
        const currentPlayer = `P${ctx.currentPlayer}`;
        const currentIndex = G.cells.findIndex(c => c === currentPlayer);
        
        const directions = [
            { x: 0, y: 2 }, { x: 0, y: -2 },
            { x: 2, y: 0 }, { x: -2, y: 0 },
            { x: 1, y: 1 }, { x: 1, y: -1 },
            { x: -1, y: 1 }, { x: -1, y: -1 }
        ];
        
        const currX = currentIndex % 5;
        const currY = Math.floor(currentIndex / 5);
        
        const validMoves = directions.map(d => ({
            x: currX + d.x,
            y: currY + d.y
        })).filter(pos => pos.x >= 0 && pos.x < 5 && pos.y >= 0 && pos.y < 5);
        
        if (validMoves.length > 0) {
            const move = validMoves[Math.floor(Math.random() * validMoves.length)];
            const targetIndex = move.y * 5 + move.x;
            G.cells[currentIndex] = null;
            G.cells[targetIndex] = currentPlayer;
        }
    }
  },

  endIf: ({ G, ctx }) => {
    // Basic win condition: if no more artifacts, player with most wins? 
    // Or just first to reach a certain spot.
    // Let's say first to reach the center (12) with an artifact?
    // Simplified: No win condition yet, just a playground.
    // Actually, let's make it: collect all artifacts.
    if (!G.cells.includes('A')) {
        return { winner: ctx.currentPlayer };
    }
  },
};
