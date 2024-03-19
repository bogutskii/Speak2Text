import React, { useState } from "react";
import { connect } from "react-redux";
import {
  toggleRule,
  setAutocorrect,
  useAutocorrect,
} from "../../actions/rulesControlActions";
import Modal from "../Modal";
import { updateFinalTranscript } from "../../actions/transcriptActions";
import NewRuleForm from "./NewRuleForm";
const RulesComponent = ({
  rules,
  currentRecognitionLanguage,
  toggleRule,
  interfaceLanguage,
  autocorrect,
  setAutocorrect,
  updateFinalTranscript,
  finalTranscript,
  useAutocorrect,
}) => {
  const [activeModal, setActiveModal] = useState(null);
  const handleToggle = (language, ruleName, params) => {
    toggleRule(language, ruleName, params);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
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

  const handleToggleAutocorrect = () => {
    setAutocorrect(!autocorrect);
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
          <button
            className="glow-button regular"
            onClick={() => openModal("newRule")}
          >
            +
          </button>
        </div>
      </div>
      <div className="options-list">
        <div className="option-item">
          <label className="option-label">
            <input
              name='autocorrect'
              type="checkbox"
              checked={autocorrect}
              onChange={handleToggleAutocorrect}
              className="option-checkbox"
            />
          </label>
          <div className="option-content">
            <span
              className="option-name glow-button todo"
              onClick={useAutocorrect}
            >
              {"autocorrect"}
            </span>

            <div>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path>
                <circle cx="12" cy="12" r="3.5"></circle>
              </svg>
            </div>
          </div>
        </div>
        {rules[currentRecognitionLanguage].map((rule) => (
          <div key={rule.name} className="option-item">
            <label className="option-label">
              <input
                name={rule.name+'unqKey'}
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
      <Modal
        isOpen={activeModal === "newRule"}
        onClose={setActiveModal}
        children={<NewRuleForm onClose={closeModal} />}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  rules: state.rulesControl,
  currentRecognitionLanguage: state.transcript.currentRecognitionLanguage,
  interfaceLanguage: state.transcript.interfaceLanguage,
  autocorrect: state.transcript.autocorrect,
  finalTranscript: state.transcript.finalTranscript,
});

const mapDispatchToProps = {
  toggleRule,
  updateFinalTranscript,
  setAutocorrect,
  useAutocorrect,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
