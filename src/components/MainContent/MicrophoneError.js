import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const MicrophoneError = ({ interfaceLanguage, microphoneError, volume, isListening }) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timer;

    if (volume === 0) {
      timer = setTimeout(() => {
        setShowError(true);
      }, 5000);
    } else {
      setShowError(false);
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [volume]);

  if (showError && microphoneError && isListening) {
    return (
      <div className="microphone-error">
        {interfaceLanguage.microphone_error_text}
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state) => ({
  microphoneError: state.transcript.microphoneError,
  interfaceLanguage: state.transcript.interfaceLanguage,
  isListening: state.transcript.isListening,
});

export default connect(mapStateToProps)(MicrophoneError);
