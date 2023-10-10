import React from 'react';

const TranscriptContainer = ({ finalTranscript, interimTranscript }) => {
  return (
    <div className="transcript-container">
      <textarea
        className="transcript-text"
        value={finalTranscript}
        onChange={() => {}}
      ></textarea>
      <div className="interim-transcript">{interimTranscript}</div>
    </div>
  );
};

export default TranscriptContainer;
