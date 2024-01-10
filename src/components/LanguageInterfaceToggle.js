import React from "react";
import { connect } from "react-redux";
import  {setInterfaceLanguage,loadLanguageFile}  from "../actions/transcriptActions";

const LanguageInterfaceToggle = ({ currentInterfaceLanguage, setInterfaceLanguage, loadLanguageFile }) => {
  const handleInterfaceChange = (selectedValue) => {
    setInterfaceLanguage(selectedValue);
    loadLanguageFile(selectedValue);
  }

  return (
    <div className="language-toggle">
      <button
        className={`glow-button ${currentInterfaceLanguage === "en" ? "lang" : "empty"}`}
        onClick={() => handleInterfaceChange("en")}
      >
        Eng
      </button>
      <button
        className={`glow-button ${currentInterfaceLanguage === "ru" ? "lang" : "empty"}`}
        onClick={() => handleInterfaceChange("ru")}
      >
        Рус
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentInterfaceLanguage: state.transcript.currentInterfaceLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage

});

const mapDispatchToProps = {
  setInterfaceLanguage,
  loadLanguageFile
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInterfaceToggle);
