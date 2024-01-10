import React from "react";
import { connect } from "react-redux";
import  { setRecognitionLanguage}  from "../actions/transcriptActions";

const LanguageRecognitionSelector = ({
  recognitionLanguage,
  interfaceLanguage,
}) => {

  const handleLanguageChange = (selectedValue) => {
    console.log("selectedValue:", selectedValue)
    
    setRecognitionLanguage(selectedValue);
  };

  return (
    <div className="language-selector">
      <label htmlFor="recognition-language-select">{interfaceLanguage.labelRecognition}: </label>
      <select
        id="recognition-language-select"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={recognitionLanguage}
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
  interfaceLanguage: state.transcript.interfaceLanguage

});

const mapDispatchToProps = {
  setRecognitionLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageRecognitionSelector);
