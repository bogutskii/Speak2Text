import React from 'react';
import { connect } from 'react-redux';
import { toggleRule } from '../actions/transcriptActions';

function RulesComponent({ rules, toggleRule }) {
  const ruleCheckboxes = rules.map((rule) => (
    <div key={rule.name}>
      <label>
        <input
          type="checkbox"
          checked={rule.active}
          onChange={() => toggleRule(rule.name)}
        />
        {rule.name}
      </label>
    </div>
  ));

  return (
    <div>
      <h2>Options</h2>
      {ruleCheckboxes}
    </div>
  );
}

const mapStateToProps = (state) => ({
  rules: state.transcript.rules,
});

const mapDispatchToProps = {
  toggleRule,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
