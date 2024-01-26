import React from "react";
import { connect } from "react-redux";
import { setRecognitionLanguage } from "../../actions/transcriptActions";

const LanguageRecognitionSelector = ({
  recognitionLanguage,
  interfaceLanguage,
  currentRecognitionLanguage,
  setRecognitionLanguage,
}) => {
  const handleLanguageChange = (selectedValue) => {
    setRecognitionLanguage(selectedValue);
  };

  return (
    <div className="language-selector">
      <select
        id="recognition-language-select"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={recognitionLanguage[currentRecognitionLanguage]}
      >
        {recognitionLanguage.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  recognitionLanguage: state.transcript.recognitionLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
});

const mapDispatchToProps = {
  setRecognitionLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageRecognitionSelector);
