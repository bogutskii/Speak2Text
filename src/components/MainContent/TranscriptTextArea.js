import React from "react";
import { connect } from "react-redux";
import { updateFinalTranscript } from "../../actions/transcriptActions";
const TranscriptTextArea = ({ finalTranscript, updateFinalTranscript }) => {
  const textAreaOnChange = (e) => {
    updateFinalTranscript(e.target.value);
  };
  return (
      <textarea
        name="transcript-text-name"
        className="transcript-text"
        value={finalTranscript}
        onChange={textAreaOnChange}
      />
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
