import React from "react";
import { connect } from "react-redux";
import {
  setInterfaceLanguage,
  setCurrentInterface,
  loadLanguageFile,
} from "../actions/transcriptActions";

const LanguageInterfaceToggle = ({
  currentInterfaceLanguage,
  setInterfaceLanguage,
  loadLanguageFile,
  setCurrentInterface,
}) => {
  const handleInterfaceChange = (selectedValue) => {
    setInterfaceLanguage(selectedValue);
    loadLanguageFile(selectedValue);
    setCurrentInterface(selectedValue);
  };

  return (
    <div className="language-toggle">
      <button
        className={`glow-button sm ${
          currentInterfaceLanguage === "en" ? "lang" : "empty"
        }`}
        onClick={() => handleInterfaceChange("en")}
      >
        Eng
      </button>
      <button
        className={`glow-button sm ${
          currentInterfaceLanguage === "ukr" ? "ukraine" : "empty"
        }`}
        onClick={() => handleInterfaceChange("ukr")}
      >
        Ukr
      </button>
      <button
        className={`glow-button sm ${
          currentInterfaceLanguage === "ru" ? "lang" : "empty"
        }`}
        onClick={() => handleInterfaceChange("ru")}
      >
        Rus
      </button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentInterfaceLanguage: state.transcript.currentInterfaceLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage,
});

const mapDispatchToProps = {
  setInterfaceLanguage,
  loadLanguageFile,
  setCurrentInterface,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageInterfaceToggle);
