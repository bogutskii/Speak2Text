import React, { useEffect, useState, useRef, useCallback } from "react";
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

function App({ finalTranscript, interimTranscript, rules, updateFinalTranscript, updateInterimTranscript }) {
  const [isListening, setIsListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [microphoneError, setMicrophoneError] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [recognitionLanguage, setRecognitionLanguage] = useState("ru-RU");
  const textAreaRef = useRef(null);

  useEffect(() => {
    try {
      const langFile = require(`../lang/translations_${language}.json`);
      setTranslations(langFile);
    } catch (error) {
      console.error("Ошибка загрузки файла локализации:", error);
    }
  }, [language]);

  const filterByRule = (text, rules) => {
    let modifiedText = text;
    rules.forEach(rule => {
      if (rule.active) {
        const regex = new RegExp(`(?<!\\w)${rule.name}(?!\\w)`, "gi");
        modifiedText = modifiedText.replace(regex, rule.symbol);
      }
    });
    return modifiedText;
  };

  const handleResult = useCallback((event) => {
    let interimTranscriptValue = "";
    
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      const filteredInterimTranscript = filterByRule(transcript, rules);
      if (event.results[i].isFinal) {
        updateFinalTranscript(finalTranscript + filterByRule(transcript, rules));
      } else {
        interimTranscriptValue += filteredInterimTranscript;
      }
    }
    updateInterimTranscript(interimTranscriptValue);
  }, [finalTranscript, updateFinalTranscript, updateInterimTranscript, rules]);

  const handleEnd = useCallback(() => {
    if (isListening) {
      recognition.start();
    }
  }, [isListening]);

  const handleError = useCallback(() => {
    setMicrophoneError(true);
  }, []);

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

  const toggleListening = () => {
    setIsListening((prevIsListening) => {
      if (prevIsListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      return !prevIsListening;
    });
  };

  const resetTranscript = () => {
    setIsListening(false);
    updateFinalTranscript("");
    updateInterimTranscript("");
    setMicrophoneError(false);
    recognition.stop();
  };

  const copyToClipboard = () => {
    textAreaRef.current.value = finalTranscript.trim();
    textAreaRef.current.select();
    document.execCommand('copy');
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
        setFinalTranscript={updateFinalTranscript}
        setInterimTranscript={updateInterimTranscript}
        showToast={showToast}
        translations={translations}
      />
      <div className="interim-transcript">{interimTranscript}</div>
      <RulesComponent />
      {showToast && <Toast message={translations.text_copied_toast} />}
      <textarea ref={textAreaRef} style={{ position: 'absolute', left: '-9999px' }} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  finalTranscript: state.transcript.finalTranscript,
  interimTranscript: state.transcript.interimTranscript,
  rules: state.transcript.rules
});

const mapDispatchToProps = (dispatch) => ({
  updateFinalTranscript: (transcript) =>
    dispatch(updateFinalTranscript(transcript)),
  updateInterimTranscript: (transcript) =>
    dispatch(updateInterimTranscript(transcript)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
