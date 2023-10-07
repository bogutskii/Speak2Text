// AudioVisualizer.js

import React from "react";
import "./AudioVisualizer.css"; // Создайте CSS-файл для стилей

const AudioVisualizer = ({ volume }) => {
  const barStyle = {
    width: `${volume * 100}%`,
  };

  return (
    <div className="audio-visualizer">
      <div className="volume-bar" style={barStyle}></div>
    </div>
  );
};

export default AudioVisualizer;
