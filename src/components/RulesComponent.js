import React from "react";
import { connect } from "react-redux";
import { toggleRule } from "../actions/rulesControlActions";

const RulesComponent = ({ rules, currentRecognitionLanguage, toggleRule }) => {
  const handleToggle = (language, ruleName) => {
    toggleRule(language, ruleName);
  };
  return (
    <div className="options-main">
      <h2>Options</h2>
      <div className="options-list">
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
              {rule.name} {rule.symbol}
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
});

const mapDispatchToProps = {
  toggleRule,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
