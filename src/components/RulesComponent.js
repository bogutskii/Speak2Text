import React from "react";
import { connect } from "react-redux";
import { toggleRule } from "../actions/rulesControlActions";

const RulesComponent = ({
  rules,
  currentRecognitionLanguage,
  toggleRule,
  interfaceLanguage,
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
  return (
    <div className="options-main">
      <h2>{interfaceLanguage.rules_title}</h2>
      <div className="button-container mb-0">
        <button className="glow-button regular" onClick={selectAllRules}>
          {interfaceLanguage.button_select_all}
        </button>
        <button className="glow-button regular" onClick={deselectAllRules}>
          {interfaceLanguage.button_unselect_all}
        </button>
      </div>
      <div className="options-list">
        {rules[currentRecognitionLanguage].map((rule) => (
          <div key={rule.name} className="option-item">
          <label className="option-label">
            <input
              type="checkbox"
              checked={rule.active}
              onChange={() => handleToggle(currentRecognitionLanguage, rule.name)}
              className="option-checkbox"
            />
            <div className="option-content">
              <span className="option-name">{rule.name}</span>
              <span className="option-symbol">{rule.symbol}</span>
            </div>
          </label>
        </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rules: state.rulesControl,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage,
});

const mapDispatchToProps = {
  toggleRule,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
