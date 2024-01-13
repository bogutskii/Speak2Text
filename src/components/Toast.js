import React from "react";
import { connect } from "react-redux";

function Toast({ interfaceLanguage, copiedToClipboard }) {  
  if (!copiedToClipboard) {
    return null;
  }
  return <div className="toast" >{interfaceLanguage.text_copied_toast}</div>;
}

const mapStateToProps = (state) => ({
  copiedToClipboard: state.transcript.copiedToClipboard,
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(Toast);
