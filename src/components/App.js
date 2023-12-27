import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  updateFinalTranscript,
  updateInterimTranscript,
} from "../actions/transcriptActions";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import LanguageInterfaceToggle from "./LanguageInterfaceToggle";
import MicrophoneError from "./MicrophoneError";
import TranscriptTextArea from "./TranscriptContainer";
import RulesComponent from "./RulesComponent";
import LanguageSelector from "./LanguageSelector";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ru-RU";
recognition.continuous = true;
recognition.interimResults = true;

function App() {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [microphoneError, setMicrophoneError] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [lastRecognitionStartTime, setLastRecognitionStartTime] = useState(0);
  const [recognitionLanguage, setRecognitionLanguage] = useState("ru-RU");

  useEffect(() => {
    const langFile = require(`../lang/translations_${language}.json`);
    setTranslations(langFile);
  }, [language]);

  useEffect(() => {
    recognition.onresult = function (event) {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setFinalTranscript((prevTranscript) => prevTranscript + transcript);
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
    setMicrophoneError(false);
    const currentTime = Date.now();
    if (isListening) {
      if (currentTime - lastRecognitionStartTime >= 1000) {
        setIsListening(false);
        recognition.stop();
      }
    } else {
      setIsListening(true);
      recognition.stop();
      recognition.start();
      setLastRecognitionStartTime(currentTime);
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

  const handleRecognitionLanguageChange = (selectedLanguage) => {
    setRecognitionLanguage(selectedLanguage);
    recognition.lang = selectedLanguage;
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div className="app-container">
      <div className="top-section">
        <LanguageSelector
          onLanguageChange={setLanguage}
          onRecognitionLanguageChange={handleRecognitionLanguageChange}
          currentLanguage={recognitionLanguage}
          labelRecognition={translations.labelRecognition}
          languages={translations.languages}
        />
        <div>
          <LanguageInterfaceToggle
            onLanguageChange={setLanguage}
            language={language}
          />
        </div>
        <div className="title">{translations.app_title}</div>
      </div>

      <ButtonContainer
        isListening={isListening}
        onStart={toggleListening}
        onStop={toggleListening}
        onReset={resetTranscript}
        onCopy={copyToClipboard}
        startButtonText={translations.start_button_text}
        stopButtonText={translations.stop_button_text}
        resetButtonText={translations.reset_button_text}
        copyButtonText={translations.copy_button_text}
      />

      {microphoneError && (
        <MicrophoneError errorMessage={translations.microphone_error_text} />
      )}

      <TranscriptTextArea
        finalTranscript={finalTranscript}
        interimTranscript={interimTranscript}
        setFinalTranscript={setFinalTranscript}
        setInterimTranscript={setInterimTranscript}
        showToast={showToast}
        translations={translations}
      />

      <RulesComponent />
      <div className="interim-transcript">{interimTranscript}</div>
      {showToast && <Toast message={translations.text_copied_toast} />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  finalTranscript: state.transcript.finalTranscript,
  interimTranscript: state.transcript.interimTranscript,
});

const mapDispatchToProps = (dispatch) => ({
  updateFinalTranscript: (transcript) =>
    dispatch(updateFinalTranscript(transcript)),
  updateInterimTranscript: (transcript) =>
    dispatch(updateInterimTranscript(transcript)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
