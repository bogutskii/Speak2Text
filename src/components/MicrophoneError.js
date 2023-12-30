import React from 'react';

const MicrophoneError = ({ errorMessage }) => {
  return (
    <div className="microphone-error">
      {errorMessage}
    </div>
  );
};

export default MicrophoneError;
