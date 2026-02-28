import React from 'react';
import type { BoardProps } from 'boardgame.io/react';
import type { GameState } from './Game';

export const ArtefactoBoard: React.FC<BoardProps<GameState>> = ({ G, ctx, moves }) => {
  const onClick = (id: number) => moves.moveSafe(id);
  const onAbsurdClick = () => moves.moveAbsurd();

  const tbody = [];
  for (let i = 0; i < 5; i++) {
    const cells = [];
    for (let j = 0; j < 5; j++) {
      const id = 5 * i + j;
      cells.push(
        <td
          key={id}
          onClick={() => onClick(id)}
          style={{
            width: '50px',
            height: '50px',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: G.cells[id] === 'A' ? '#ffd700' : '#fff'
          }}
        >
          {G.cells[id] === 'P0' && '👤0'}
          {G.cells[id] === 'P1' && '👤1'}
          {G.cells[id] === 'A' && '🧉'}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div>
      <h2>DCUBA Jam: Artefacto Absurdo</h2>
      <div style={{ marginBottom: '20px' }}>
        <p>Turno del Jugador: {ctx.currentPlayer}</p>
        <button onClick={onAbsurdClick} style={{ padding: '10px', fontSize: '16px' }}>
            🌀 Movimiento Absurdo (Binario)
        </button>
      </div>
      <table id="board" style={{ margin: '0 auto' }}>
        <tbody>{tbody}</tbody>
      </table>
      {ctx.gameover && (
        <div id="winner">
          <h3>Ganador: {ctx.gameover.winner}</h3>
        </div>
      )}
      <div style={{ marginTop: '20px', fontSize: '0.8em', color: '#666' }}>
        <p>Pabellón 0+∞ - Departamento de Computación (UBA)</p>
      </div>
    </div>
  );
};
