import React, { useState, useEffect } from "react";
import "./App.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

function App() {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [microphoneError, setMicrophoneError] = useState(false);
  const [language, setLanguage] = useState("en"); // Изначально устанавливаем английский язык
  const [translations, setTranslations] = useState({}); // Состояние для хранения переводов

  useEffect(() => {
    const langFile = require(`./lang/translations_${language}.json`);
    setTranslations(langFile);
  }, [language]);

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
      <div className="top-section">
        <div className="language-toggle">
          <button
            className={`glow-button ${language === "en" ? "lang" : "empty"}`}
            onClick={() => setLanguage("en")}
          >
            Eng
          </button>
          <button
            className={`glow-button ${language === "ru" ? "lang" : "empty"}`}
            onClick={() => setLanguage("ru")}
          >
            Рус
          </button>
        </div>
        <div className="title">{translations.app_title}</div>
      </div>

      <div className="button-container">
        <button
          className={`glow-button ${isListening ? "stop" : "start"}`}
          onClick={toggleListening}
        >
          {isListening
            ? translations.stop_button_text
            : translations.start_button_text}
        </button>
        <button className="glow-button reset" onClick={resetTranscript}>
          {translations.reset_button_text}
        </button>
        <button className="glow-button copy" onClick={copyToClipboard}>
          {translations.copy_button_text}
        </button>
      </div>
      {microphoneError && (
        <div className="microphone-error">
          {translations.microphone_error_text}
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
      {showToast && <Toast message={translations.text_copied_toast} />}
    </div>
  );
}

function Toast({ message }) {
  return <div className="toast">{message}</div>;
}

export default App;
