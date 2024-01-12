import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import TranscriptTextArea from "./TranscriptTextArea";

import {
  updateFinalTranscript,
  updateInterimTranscript,
  setMicrophoneError,
} from "../actions/transcriptActions";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function SpeechRecognitionComponent({
  updateFinalTranscript,
  updateInterimTranscript,
  setMicrophoneError,
  isListening,
  interimTranscript,
  finalTranscript
}) {
  const handleResult = useCallback(
    (event) => {
      let interimTranscriptValue = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          updateInterimTranscript(transcript);
          updateFinalTranscript(finalTranscript +interimTranscriptValue + transcript + " ");
          interimTranscriptValue = ""; 
          setMicrophoneError(false)
        } else {
          
          interimTranscriptValue += transcript;
        }
      }
    },
    [updateFinalTranscript, updateInterimTranscript, finalTranscript, setMicrophoneError]
  );

  const handleEnd = useCallback(() => {
    if (isListening) {
      recognition.start();
    }
  }, [isListening]);

  const handleError = useCallback(() => {
    setMicrophoneError(true);
  }, [setMicrophoneError]);

  useEffect(() => {
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.onnomatch = handleError;
    recognition.onerror = handleError;

    return () => {
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onnomatch = null;
      recognition.onerror = null;
    };
  }, [handleResult, handleEnd, handleError]);

  useEffect(() => {
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening]);

  return (
    <div>
      <TranscriptTextArea />
      <div className="interim-transcript">{interimTranscript}</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
  microphoneError: state.transcript.microphoneError,
  interimTranscript: state.transcript.interimTranscript,
  finalTranscript: state.transcript.finalTranscript,
});

const mapDispatchToProps = {
  updateFinalTranscript,
  updateInterimTranscript,
  setMicrophoneError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeechRecognitionComponent);
