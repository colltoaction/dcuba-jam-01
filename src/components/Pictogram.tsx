import React from 'react';
import Grapheme from './Grapheme';

interface PictogramProps {
  parts: string[];
}

const UBA_COLORS = {
  NAVY: '#0b1b40',
  LIGHT_BLUE: '#b2d0eb',
  YELLOW: '#f4a900',
  TEAL: '#3bc3ad',
  WHITE: '#ffffff',
};

const Pictogram: React.FC<PictogramProps> = ({ parts }) => {
  const renderPart = (part: string, index: number) => {
    const isFormal = part === 'formal-module';
    const type = isFormal ? (index % 3 === 0 ? 'pillar' : index % 3 === 1 ? 'arch' : 'square') : (index % 3 === 0 ? 'circle' : index % 3 === 1 ? 'waves' : 'triangle');
    const color = isFormal ? UBA_COLORS.TEAL : (index % 2 === 0 ? UBA_COLORS.YELLOW : UBA_COLORS.LIGHT_BLUE);
    
    return (
      <div key={index} style={{ 
        position: 'absolute', 
        left: `${(index % 4) * 60}px`, 
        top: `${Math.floor(index / 4) * 60}px`,
        transition: 'all 0.5s ease-out'
      }}>
        <Grapheme type={type} color={color} />
      </div>
    );
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '240px', 
      height: '300px', 
      border: `2px solid ${UBA_COLORS.NAVY}`,
      backgroundColor: '#f8f8f8',
      margin: '20px auto',
      overflow: 'hidden'
    }}>
      {parts.map((part, i) => renderPart(part, i))}
      {parts.length === 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          color: '#888',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '20px'
        }}>
          Esperando directivas del Rectorado...
        </div>
      )}
    </div>
  );
};

export default Pictogram;
