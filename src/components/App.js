import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import LanguageInterfaceToggle from "./LanguageInterfaceToggle";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent"; // Импорт нового компонента

function App({ interfaceLanguage }) {
  return (
    <div className="app-container">
      <LanguageRecognitionSelector />
      <LanguageInterfaceToggle />
      <div className="title">{interfaceLanguage.app_title}</div>
      <ButtonContainer />
      <SpeechRecognitionComponent />
      <Toast />
      <RulesComponent />
    </div>
  );
}

const mapStateToProps = (state) => ({
  interfaceLanguage: state.transcript.interfaceLanguage,
});

export default connect(mapStateToProps)(App);
