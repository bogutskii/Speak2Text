import React from 'react';

const TranscriptTextArea = ({ finalTranscript, setFinalTranscript }) => {
  return (
    <div className="transcript-container">
      <textarea
        className="transcript-text"
        value={finalTranscript}
        onChange={(e) => setFinalTranscript(e.target.value)}
      ></textarea>
    </div>
  );
};


export default TranscriptTextArea;
