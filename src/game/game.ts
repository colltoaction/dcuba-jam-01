import type { Game } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

export interface GameState {
  stability: number;
  absurdity: number;
  integration: number;
  artifactParts: string[];
  gameOver: string | null;
  turn: number;
}

const applyMove = (G: GameState, type: 'formalism' | 'intuitionism') => {
  if (G.gameOver) return INVALID_MOVE;

  if (type === 'formalism') {
    G.stability = Math.min(100, G.stability + 15);
    G.absurdity = Math.max(0, G.absurdity - 15);
    G.integration += 10;
    G.artifactParts.push('formal-module');
  } else {
    G.stability = Math.max(0, G.stability - 15);
    G.absurdity = Math.min(100, G.absurdity + 15);
    G.integration += 10;
    G.artifactParts.push('absurd-module');
  }

  G.turn += 1;

  // Check end conditions
  if (G.integration >= 100) {
    if (G.stability > 80 && G.absurdity < 20) {
      G.gameOver = 'Formalismo Absoluto: El artefacto es tan estable que no hace nada.';
    } else if (G.absurdity > 80 && G.stability < 20) {
      G.gameOver = 'Delirio Colectivo: El artefacto ha trascendido la realidad física.';
    } else if (G.stability >= 40 && G.stability <= 60 && G.absurdity >= 40 && G.absurdity <= 60) {
      G.gameOver = 'PLATINADO: Integración Institucional PerfectA. ¡Sello de Buen Diseño 2022!';
    } else {
      G.gameOver = 'Bicentenario Completado: El artefacto se exhibe en las escalinatas de la Facultad de Derecho.';
    }
  } else if (G.stability <= 0) {
    G.gameOver = 'Colapso Estructural: El artefacto se desintegró por falta de rigor formal.';
  } else if (G.absurdity <= 0) {
    G.gameOver = 'Muerte por Burocracia: El artefacto es tan normal que dejó de existir.';
  }
};

export const UBAOMatic: Game<GameState> = {
  name: 'uba-o-matic',
  
  setup: () => ({
    stability: 50,
    absurdity: 50,
    integration: 0,
    artifactParts: [],
    gameOver: null,
    turn: 1,
  }),

  moves: {
    chooseFormalism: (G) => applyMove(G, 'formalism'),
    chooseIntuitionism: (G) => applyMove(G, 'intuitionism'),
  },

  endIf: (G) => {
    if (G.gameOver) {
      return { winner: G.gameOver };
    }
  },
};
