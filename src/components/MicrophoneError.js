import React from "react";
import { connect } from "react-redux";
// import  {interfaceLanguage, recognitionLanguage}  from "../actions/transcriptActions";

const MicrophoneError = ({ interfaceLanguage, microphoneError }) => {
if(microphoneError) return null

return (
  <div className="microphone-error">
    {interfaceLanguage.microphone_error_text}
  </div>
);
};

const mapStateToProps = (state) => ({
  microphoneError:  state.transcript.microphoneError,
  interfaceLanguage: state.transcript.interfaceLanguage
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MicrophoneError);

