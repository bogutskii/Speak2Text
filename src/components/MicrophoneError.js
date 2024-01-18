import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const MicrophoneError = ({ interfaceLanguage, microphoneError, volume }) => {
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

  if (showError && microphoneError) {
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
});

export default connect(mapStateToProps)(MicrophoneError);
