import React from "react";
import { connect } from "react-redux";
import "./App.css";
import {
  updateFinalTranscript,
  updateInterimTranscript,
  toggleListening,
  setMicrophoneError,
  loadLanguageFile,
} from "../actions/transcriptActions";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import LanguageInterfaceToggle from "./LanguageInterfaceToggle";
import MicrophoneError from "./MicrophoneError";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent"; // Импорт нового компонента

function App({ interfaceLanguage, microphoneError }) {
  return (
    <div className="app-container">
      <div className="top-section">
        <LanguageRecognitionSelector />
        <div>
          <LanguageInterfaceToggle />
        </div>
        <div className="title">{interfaceLanguage.app_title}</div>
      </div>
      <ButtonContainer />
      <SpeechRecognitionComponent />
      
      <MicrophoneError />
      <Toast message={interfaceLanguage.text_copied_toast} />
      <RulesComponent />
    </div>
  );
}

const mapStateToProps = (state) => ({
  finalTranscript: state.transcript.finalTranscript,
  interimTranscript: state.transcript.interimTranscript,
  rules: state.transcript.rules,
  isListening: state.transcript.isListening,
  microphoneError: state.transcript.microphoneError,
  interfaceLanguage: state.transcript.interfaceLanguage,
});

const mapDispatchToProps = {
  updateFinalTranscript,
  updateInterimTranscript,
  toggleListening,
  setMicrophoneError,
  loadLanguageFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
