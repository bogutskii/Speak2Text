import React from "react";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import { ContactUs } from "./ContactUs";
import Header from "./Header";
function App() {
  return (
    <div className="app-container">
      <Header />
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
