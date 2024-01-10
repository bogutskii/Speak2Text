import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import TranscriptTextArea from "./TranscriptContainer";

import {
  updateFinalTranscript,
  updateInterimTranscript,
  toggleListening,
  setMicrophoneError
} from '../actions/transcriptActions';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function SpeechRecognitionComponent({ 
  updateFinalTranscript, 
  updateInterimTranscript, 
  toggleListening, 
  setMicrophoneError, 
  isListening, 
  microphoneError 
}) {
  const handleResult = useCallback((event) => {
    console.log("🚀 ~ file: SpeechRecognitionComponent.js:24 ~ handleResult ~ event:", event)
    let interimTranscriptValue = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        updateFinalTranscript(transcript);
      } else {
        interimTranscriptValue += transcript;
      }
    }
    updateInterimTranscript(interimTranscriptValue);
  }, [updateFinalTranscript, updateInterimTranscript]);

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
      {microphoneError && <div>Ошибка микрофона</div>}
      <TranscriptTextArea />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
  microphoneError: state.transcript.microphoneError
});

const mapDispatchToProps = {
  updateFinalTranscript,
  updateInterimTranscript,
  toggleListening,
  setMicrophoneError
};

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognitionComponent);
