// src/components/AnimatedImage.js

import React from 'react';
import '../FloatingText.css'

const AnimatedImage = ({ src, alt }) => {
  return (
    <div className="relative p-2 hover:transform hover:scale-105 transition-transform duration-500 floate">
      <img className="rounded-lg shadow-lg" src={src} alt={alt} />
    </div>
  );
};

export default AnimatedImage;
