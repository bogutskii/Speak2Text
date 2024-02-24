import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import TranscriptTextArea from "./TranscriptTextArea";
import {
  updateFinalTranscript,
  updateInterimTranscript,
  setMicrophoneError,
} from "../../actions/transcriptActions";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function SpeechRecognitionComponent({
  updateFinalTranscript,
  updateInterimTranscript,
  setMicrophoneError,
  isListening,
  interimTranscript,
  finalTranscript,
  currentRecognitionLanguage,
  rules,
}) {
  const handleResult = useCallback(
    (event) => {
      const filterByRule = (text) => {
        rules[currentRecognitionLanguage].forEach((rule) => {
          if (rule.active) {
            const regex = new RegExp(
              `(^|(?<=\\s))${rule.name}(?=(\\s|\\.|\\;|$))`,
              "gi"
            );
            text = text.replace(regex, rule.symbol);
          }
        });
        return text;
      };

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        // updateInterimTranscript(transcript);

        if (event.results[i].isFinal) {
          updateFinalTranscript(
            finalTranscript + filterByRule(transcript) + " "
          );
          setMicrophoneError(false);
          // setTimeout(() => {
          //   updateInterimTranscript("");
          // }, 1000);
        }
      }
    },
    [
      updateFinalTranscript,
      finalTranscript,
      setMicrophoneError,
      currentRecognitionLanguage,
      rules,
    ]
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
    const startRecognition = () => {
      try {
        recognition.start();
      } catch (error) {}
    };
    if (isListening) {
      if (recognition && recognition.abort) {
        recognition.abort();
      }
      recognition.lang = currentRecognitionLanguage;
      startRecognition();
    } else {
      recognition.stop();
    }
  }, [isListening, currentRecognitionLanguage]);

  return (
    <div>
      <TranscriptTextArea />
      { <div className="interim-transcript">{interimTranscript}</div> }
    </div>
  );
}

const mapStateToProps = (state) => ({
  isListening: state.transcript.isListening,
  microphoneError: state.transcript.microphoneError,
  interimTranscript: state.transcript.interimTranscript,
  finalTranscript: state.transcript.finalTranscript,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
  rules: state.rulesControl,
  autocorrector: state.transcript.autocorrector,
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
