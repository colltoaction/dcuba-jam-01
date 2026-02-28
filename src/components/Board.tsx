import React from 'react';
import type { BoardProps } from 'boardgame.io/react';
import type { GameState } from '../game/game';
import Pictogram from './Pictogram';

const UBA_COLORS = {
  NAVY: '#0b1b40',
  LIGHT_BLUE: '#b2d0eb',
  YELLOW: '#f4a900',
  TEAL: '#3bc3ad',
  WHITE: '#ffffff',
};

const Board: React.FC<BoardProps<GameState>> = ({ G, moves, ctx }) => {
  const isGameOver = ctx.gameover;

  return (
    <div style={{
      maxWidth: '515px',
      margin: '10px auto',
      fontFamily: "'Bitter', serif, sans-serif",
      backgroundColor: UBA_COLORS.WHITE,
      color: UBA_COLORS.NAVY,
      padding: '20px',
      border: `4px solid ${UBA_COLORS.NAVY}`,
      boxShadow: `10px 10px 0px ${UBA_COLORS.LIGHT_BLUE}`,
      borderRadius: '4px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', margin: '0', textTransform: 'uppercase' }}>
          UBA-O-MATIC
        </h1>
        <p style={{ fontSize: '1.2rem', marginTop: '5px', fontStyle: 'italic' }}>
          Edición Bicentenario: El Artefacto Absurdo
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ borderBottom: `2px solid ${UBA_COLORS.NAVY}` }}>ESTADO DEL SISTEMA</h2>
          <div style={{ marginBottom: '15px', color: UBA_COLORS.TEAL, fontSize: '0.8rem', fontWeight: 'bold' }}>
            ✓ BRAND COMPLIANCE: {G.stability > 20 ? 'CERTIFIED' : 'WARNING'}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>ESTABILIDAD FORMAL:</strong>
            <div style={{ height: '20px', backgroundColor: '#eee', marginTop: '5px' }}>
              <div style={{
                height: '100%',
                width: `${G.stability}%`,
                backgroundColor: UBA_COLORS.TEAL,
                transition: 'width 0.5s ease-out'
              }} />
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>NIVEL DE ABSURDO:</strong>
            <div style={{ height: '20px', backgroundColor: '#eee', marginTop: '5px' }}>
              <div style={{
                height: '100%',
                width: `${G.absurdity}%`,
                backgroundColor: UBA_COLORS.YELLOW,
                transition: 'width 0.5s ease-out'
              }} />
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <strong>INTEGRACIÓN INSTITUCIONAL:</strong>
            <div style={{ height: '20px', backgroundColor: '#eee', marginTop: '5px' }}>
              <div style={{
                height: '100%',
                width: `${G.integration}%`,
                backgroundColor: UBA_COLORS.LIGHT_BLUE,
                transition: 'width 0.5s ease-out'
              }} />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ borderBottom: `2px solid ${UBA_COLORS.NAVY}` }}>EL ARTEFACTO</h2>
          <Pictogram parts={G.artifactParts} />
        </div>
      </section>

      {!isGameOver ? (
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>TURNO {G.turn}: SELECCIÓN DE ESCUELA</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button
              onClick={() => moves.chooseFormalism()}
              style={{
                padding: '20px 30px',
                fontSize: '1rem',
                backgroundColor: UBA_COLORS.TEAL,
                color: UBA_COLORS.WHITE,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '45%'
              }}
            >
              FORMALISMO ESTRICTO<br />
              <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                + Estabilidad / - Absurdo
              </span>
            </button>
            <button
              onClick={() => moves.chooseIntuitionism()}
              style={{
                padding: '20px 30px',
                fontSize: '1rem',
                backgroundColor: UBA_COLORS.YELLOW,
                color: UBA_COLORS.NAVY,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '45%'
              }}
            >
              INTUICIONISMO SALVAJE<br />
              <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                - Estabilidad / + Absurdo
              </span>
            </button>
          </div>
        </section>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '30px',
          backgroundColor: UBA_COLORS.LIGHT_BLUE,
          border: `2px dashed ${UBA_COLORS.NAVY}`
        }}>
          <h2>RESULTADO FINAL</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{ctx.gameover.winner}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: UBA_COLORS.NAVY,
              color: UBA_COLORS.WHITE,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            NUEVA CONVOCATORIA
          </button>
        </div>
      )}

      <footer style={{ marginTop: '20px', fontSize: '0.8rem', textAlign: 'center', opacity: 0.7 }}>
        DCUBA JAM 01 - TEMAS: ARTEFACTO ABSURDO - CARTAS: BINARIO, AMARGO Y RETRUCO, PLATINADO
      </footer>
    </div>
  );
};

export default Board;
