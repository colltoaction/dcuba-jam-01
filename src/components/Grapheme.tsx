import React from 'react';

interface GraphemeProps {
  type: string;
  color: string;
  size?: number;
}

const Grapheme: React.FC<GraphemeProps> = ({ type, color, size = 60 }) => {
  const shapes: Record<string, React.ReactNode> = {
    'circle': <circle cx="30" cy="30" r="25" fill={color} />,
    'square': <rect x="5" y="5" width="50" height="50" fill={color} />,
    'triangle': <polygon points="30,5 55,55 5,55" fill={color} />,
    'waves': (
      <path
        d="M5 25 Q15 15 25 25 T45 25 T65 25"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
    ),
    'pillar': (
      <g fill={color}>
        <rect x="10" y="10" width="10" height="40" />
        <rect x="25" y="10" width="10" height="40" />
        <rect x="40" y="10" width="10" height="40" />
      </g>
    ),
    'arch': (
      <path
        d="M10 50 L10 25 Q30 5 50 25 L50 50"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
    ),
  };

  const shape = shapes[type] || shapes['square'];

  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ display: 'block' }}>
      {shape}
    </svg>
  );
};

export default Grapheme;
