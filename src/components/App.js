import React from "react";
import "./App.css";
import Toast from "./Toast";
import ButtonContainer from "./ButtonContainer";
import RulesComponent from "./RulesComponent";
import LanguageRecognitionSelector from "./LanguageRecognitionSelector";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import AudioVisualizer from "./AudioVisualizer";
import Header from "./Header";
function App() {
  
  return (
    <div className="app-container metallic-background">
      <Header />
      <AudioVisualizer/>
      <LanguageRecognitionSelector />
      <ButtonContainer />
      <SpeechRecognitionComponent />
      <Toast />
      <RulesComponent />
    
  
    </div>
  );
}

export default App;
