import React from "react";
import { connect } from "react-redux";
const TranscriptTextArea = ({ finalTranscript, setFinalTranscript}) => {
  const textAreaOnChange = (e) => {
    setFinalTranscript(e.target.value);
  };

  return (
    <div className="transcript-container">
      <textarea
        className="transcript-text"
        value={finalTranscript}
        onChange={textAreaOnChange}
      />
    </div>
  );
};

// Подключение состояния Redux к свойствам компонента
const mapStateToProps = (state) => {
  return {
    rules: state.transcript.rules,
  };
};

export default connect(mapStateToProps)(TranscriptTextArea);
