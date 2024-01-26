import React from "react";
import AudioVisualizer from "./AudioVisualizer";
import ButtonContainer from "./ButtonContainer";
import SpeechRecognitionComponent from "./SpeechRecognitionComponent";
import Toast from "./Toast";
import RulesComponent from "./RulesComponent";

export const MainContent = () => {
  return (
    <div>
      <AudioVisualizer />
      <ButtonContainer />
      <SpeechRecognitionComponent />
      <Toast />
      <RulesComponent />
    </div>
  );
};

export default MainContent;
