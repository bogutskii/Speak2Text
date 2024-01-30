import React from "react";
import { connect } from "react-redux";
import {
  toggleRule,
  setAutocorrector,
  useAutocorrector,
} from "../../actions/rulesControlActions";
import { updateFinalTranscript } from "../../actions/transcriptActions";
const RulesComponent = ({
  rules,
  currentRecognitionLanguage,
  toggleRule,
  interfaceLanguage,
  autocorrector,
  setAutocorrector,
  updateFinalTranscript,
  finalTranscript,
  useAutocorrector
}) => {
  const handleToggle = (language, ruleName, params) => {
    toggleRule(language, ruleName, params);
  };
  const selectAllRules = () => {
    rules[currentRecognitionLanguage].forEach((rule) => {
      handleToggle(currentRecognitionLanguage, rule.name, true);
    });
  };

  const deselectAllRules = () => {
    rules[currentRecognitionLanguage].forEach((rule) => {
      handleToggle(currentRecognitionLanguage, rule.name, false);
    });
  };

  const handleToggleAutocorrector = () => {
    setAutocorrector(!autocorrector);
  };
  const addSymbol = (symbol) => {
    updateFinalTranscript(finalTranscript + symbol);
  };

  return (
    <div className="options-main">
      <div className="options-header">
        {/* <h2>{interfaceLanguage.rules_title}</h2> */}
        <div className="button-container mb-0">
          <button className="glow-button regular" onClick={selectAllRules}>
            {interfaceLanguage.button_select_all}
          </button>
          <button className="glow-button regular" onClick={deselectAllRules}>
            {interfaceLanguage.button_unselect_all}
          </button>
        </div>
      </div>
      <div className="options-list">
        <div className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={autocorrector}
              onChange={handleToggleAutocorrector}
              className="option-checkbox"
            />
          </label>
          <div className="option-content">
            <span className="option-name glow-button todo"
              onClick={useAutocorrector}>
              {"autocorrector"}
            </span>
          </div>
        </div>
        {rules[currentRecognitionLanguage].map((rule) => (
          <div key={rule.name} className="option-item">
            <label className="option-label">
              <input
                type="checkbox"
                checked={rule.active}
                onChange={() =>
                  handleToggle(currentRecognitionLanguage, rule.name)
                }
                className="option-checkbox"
              />
            </label>
            <div className="option-content">
              <span
                className="option-name glow-button todo"
                onClick={() => addSymbol(rule.symbol)}
              >
                {rule.name}
              </span>
              <span className="option-symbol">{rule.symbol}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="option-item"> + </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rules: state.rulesControl,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage,
  autocorrector: state.transcript.autocorrector,
  finalTranscript: state.transcript.finalTranscript,
});

const mapDispatchToProps = {
  toggleRule,
  updateFinalTranscript,
  setAutocorrector,
  useAutocorrector,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
