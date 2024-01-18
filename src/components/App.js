import React from "react";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import AudioVisualizer from "./AudioVisualizer";
import { ContactUs } from "./ContactUs";
import Header from "./Header";
function App() {
  return (
    <div className="app-container">
      <Header />
      <AudioVisualizer/>
      <LanguageRecognitionSelector />
      <ButtonContainer />
      <SpeechRecognitionComponent />
      <Toast />
      <RulesComponent />
      <ContactUs />
    </div>
  );
}

export default App;
