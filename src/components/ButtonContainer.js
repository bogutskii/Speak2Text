import React from 'react';

const ButtonContainer = ({
  isListening,
  onStart,
  onStop,
  onReset,
  onCopy,
  startButtonText,
  stopButtonText,
  resetButtonText,
  copyButtonText,
}) => {
  return (
    <div className="button-container">
      <button className={`glow-button ${isListening ? 'stop' : 'start'}`} onClick={isListening ? onStop : onStart}>
        {isListening ? stopButtonText : startButtonText}
      </button>
      <button className="glow-button reset" onClick={onReset}>
        {resetButtonText}
      </button>
      <button className="glow-button copy" onClick={onCopy}>
        {copyButtonText}
      </button>
    </div>
  );
};

export default ButtonContainer;
