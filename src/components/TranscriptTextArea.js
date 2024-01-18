import React from "react";
import { connect } from "react-redux";
import { updateFinalTranscript } from "../actions/transcriptActions";
import MicrophoneError from "./MicrophoneError";
const TranscriptTextArea = ({ finalTranscript, updateFinalTranscript }) => {
  const textAreaOnChange = (e) => {
    updateFinalTranscript(e.target.value);
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

const mapStateToProps = (state) => {
  return {
    finalTranscript: state.transcript.finalTranscript,
  };
};

const mapDispatchToProps = {
  updateFinalTranscript,
};

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptTextArea);
