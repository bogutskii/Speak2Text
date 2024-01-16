import React from "react";
import { connect } from "react-redux";

const MicrophoneError = ({ interfaceLanguage, microphoneError }) => {
  if (!microphoneError) return null;

  return (
    <div className="microphone-error">
      {interfaceLanguage.microphone_error_text}
    </div>
  );
};

const mapStateToProps = (state) => ({
  microphoneError: state.transcript.microphoneError,
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(MicrophoneError);
