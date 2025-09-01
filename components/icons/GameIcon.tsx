import React from 'react';

const GameIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.04V18h-2v-1.96c-1.38-.45-2.45-1.52-2.9-2.9H6v-2h2.1c.45-1.38 1.52-2.45 2.9-2.9V6h2v1.96c1.38.45 2.45 1.52 2.9 2.9H18v2h-2.1c-.45 1.38-1.52 2.45-2.9 2.9zM12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default GameIcon;
