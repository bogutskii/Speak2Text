import React, { useState, useEffect } from "react";
import "./App.css";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

function App() {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [microphoneError, setMicrophoneError] = useState(false);

  useEffect(() => {
    recognition.onresult = function (event) {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setFinalTranscript((prevTranscript) => prevTranscript + " " + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      setInterimTranscript(interimTranscript);
    };

    recognition.onend = function () {
      if (isListening) {
        recognition.start();
      }
    };

    recognition.onnomatch = function () {
      setMicrophoneError(true);
    };

    recognition.onerror = function (event) {
      setMicrophoneError(true);
    };
  }, [isListening]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      recognition.stop();
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  const resetTranscript = () => {
    setIsListening(false);
    setFinalTranscript("");
    setInterimTranscript("");
    setMicrophoneError(false);
    recognition.stop();
  };

  const copyToClipboard = () => {
    const textToCopy = finalTranscript.trim();
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 500);
  };

  return (
      <div className="app-container">
        <div className="title">Speech Recognition Extension</div>
        <div className="button-container">
          <button
              className={`glow-button ${isListening ? "stop" : "start"}`}
              onClick={toggleListening}
          >
            {isListening ? "Stop" : "Start"}
          </button>
          <button className="glow-button reset" onClick={resetTranscript}>
            Reset
          </button>
          <button className="glow-button copy" onClick={copyToClipboard}>
            Copy Text
          </button>
        </div>
        {microphoneError && (
            <div className="microphone-error">
              Microphone is unavailable. Please check your microphone settings.
            </div>
        )}
        <div className="transcript-container">
        <textarea
            className="transcript-text"
            value={finalTranscript}
            onChange={(e) => setFinalTranscript(e.target.value)}
        ></textarea>
        </div>
        <div className="interim-transcript">{interimTranscript}</div>
        {showToast && <Toast message="Text copied to clipboard" />}
      </div>
  );
}

function Toast({ message }) {
  return <div className="toast">{message}</div>;
}

export default App;