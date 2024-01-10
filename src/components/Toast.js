import React from "react";
import { connect } from "react-redux";

function Toast({ message, copiedToClipboard }) {
  if (!copiedToClipboard) {
    return null;
  }
  return <div className="toast" >{message}</div>;
}

const mapStateToProps = (state) => ({
  copiedToClipboard: state.transcript.copiedToClipboard
});

export default connect(mapStateToProps)(Toast);
