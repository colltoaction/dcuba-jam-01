import { describe, it, expect } from 'vitest';
import { UBAOMatic } from './game';

describe('UBAOMatic Game Logic', () => {
  it('should initialize with correct default state', () => {
    const G = UBAOMatic.setup!({} as any);
    expect(G.stability).toBe(50);
    expect(G.absurdity).toBe(50);
    expect(G.integration).toBe(0);
    expect(G.artifactParts).toEqual([]);
    expect(G.gameOver).toBeNull();
  });

  it('formalism move should increase stability and decrease absurdity', () => {
    const G = UBAOMatic.setup!({} as any);
    const ctx = {} as any;
    
    (UBAOMatic.moves!.chooseFormalism as any)(G, ctx);
    
    expect(G.stability).toBe(65);
    expect(G.absurdity).toBe(35);
    expect(G.integration).toBe(10);
    expect(G.artifactParts).toContain('formal-module');
  });

  it('intuitionism move should decrease stability and increase absurdity', () => {
    const G = UBAOMatic.setup!({} as any);
    const ctx = {} as any;
    
    (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    
    expect(G.stability).toBe(35);
    expect(G.absurdity).toBe(65);
    expect(G.integration).toBe(10);
    expect(G.artifactParts).toContain('absurd-module');
  });

  it('should achieve PLATINADO by alternating', () => {
    const G = UBAOMatic.setup!({} as any);
    const ctx = {} as any;
    
    for(let i=0; i<10; i++) {
        if (i % 2 === 0) (UBAOMatic.moves!.chooseFormalism as any)(G, ctx);
        else (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    }
    
    expect(G.integration).toBe(100);
    expect(G.stability).toBe(50);
    expect(G.absurdity).toBe(50);
    expect(G.gameOver).toContain('PLATINADO');
  });

  it('should end the game early if stability reaches 0', () => {
    const G = UBAOMatic.setup!({} as any);
    const ctx = {} as any;
    
    (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    (UBAOMatic.moves!.chooseIntuitionism as any)(G, ctx);
    
    expect(G.stability).toBe(0);
    expect(G.gameOver).toContain('Colapso Estructural');
  });
});
