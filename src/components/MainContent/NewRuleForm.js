import React, { useState } from "react";
import { connect } from "react-redux";
import { addNewRule } from "../../actions/rulesControlActions";
function NewRuleForm({ addNewRule, onClose, currentRecognitionLanguage }) {
  const [ruleDescription, setRuleDescription] = useState("");
  const [replacement, setReplacement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ rule: ruleDescription, replacement: replacement });
  };

  const onSave = () => {
    addNewRule(
      { name: ruleDescription, active: false, symbol: replacement },
      currentRecognitionLanguage
    );
    onClose(null);
  };

  return (
    <div className="new-rule-form">
      <form name='newRuleFormId' onSubmit={handleSubmit} className="contact-form p-20">
        <div className="input-container mb-0">
          <input
            type="text"
            name="rule_description"
            className="form-input"
            value={ruleDescription}
            onChange={(e) => setRuleDescription(e.target.value)}
            required
          />
          <label className="form-label">Description</label>
        </div>
        <div className="input-container mb-0">
          <input
            type="text"
            name="replacement"
            className="form-input"
            value={replacement}
            onChange={(e) => setReplacement(e.target.value)}
            required
          />
          <label  className="form-label">Replacement</label>
        </div>
        <div className="action-buttons mb-0">
          <input
            type="submit"
            value="Save"
            className="glow-button regular mr-10"
            onClick={onSave}
          />
          <button
            type="button"
            className="glow-button regular"
            onClick={() => onClose(null)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => ({
  interfaceLanguage: state.transcript.interfaceLanguage,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
});

const mapDispatchToProps = {
  addNewRule,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRuleForm);
