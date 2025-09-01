import React from 'react';

const MascotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="48" fill="#FFD18B"/>
      <path d="M73 80C73 68.402 62.9411 59 50 59C37.0589 59 27 68.402 27 80" fill="#FFECCF"/>
      <path d="M43 67C43 64.7909 41.2091 63 39 63C36.7909 63 35 64.7909 35 67" fill="#FFFFFF"/>
      <path d="M65 67C65 64.7909 63.2091 63 61 63C58.7909 63 57 64.7909 57 67" fill="#FFFFFF"/>
      <circle cx="37" cy="46" r="6" fill="white"/>
      <circle cx="63" cy="46" r="6" fill="white"/>
      <circle cx="38" cy="46" r="3" fill="black"/>
      <circle cx="62" cy="46" r="3" fill="black"/>
      <path d="M46 59L54 59C54 59 52 63 50 63C48 63 46 59 46 59Z" fill="#FFAEAE"/>
      <path d="M47 54H53" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 40L28 29" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
      <path d="M88 40L72 29" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
      <path d="M22 20L34 22" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
      <path d="M78 20L66 22" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
      <path d="M50 10C55.5228 10 60 14.4772 60 20C60 22.7614 55.5228 27 50 27C44.4772 27 40 22.7614 40 20C40 14.4772 44.4772 10 50 10Z" fill="#4A3F37"/>
      <path d="M30 18C30 12.4772 34.4772 8 40 8" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
      <path d="M70 18C70 12.4772 65.5228 8 60 8" stroke="#4A3F37" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default MascotIcon;
