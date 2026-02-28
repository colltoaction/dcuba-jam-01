import { describe, it, expect } from 'vitest';
import { Client } from 'boardgame.io/client';
import { ArtefactoAbsurdo } from './Game';

describe('ArtefactoAbsurdo', () => {
  it('should initialize with players and artifacts', () => {
    const client = Client({ game: ArtefactoAbsurdo });
    const { G } = client.getState()!;
    
    expect(G.cells).toHaveLength(25);
    expect(G.cells[0]).toBe('P0');
    expect(G.cells[24]).toBe('P1');
  });

  it('should allow a safe move', () => {
    const client = Client({ game: ArtefactoAbsurdo });
    
    // Player 0 starts at 0. Safe move to 1.
    client.moves.moveSafe(1);
    const { G } = client.getState()!;
    expect(G.cells[0]).toBeNull();
    expect(G.cells[1]).toBe('P0');
  });

  it('should allow an absurd move', () => {
    const client = Client({ game: ArtefactoAbsurdo });
    
    client.moves.moveAbsurd();
    const { G } = client.getState()!;
    // Player 0 should not be at index 0 anymore
    expect(G.cells[0]).toBeNull();
    // And should be at some other index
    expect(G.cells.includes('P0')).toBe(true);
  });
});
