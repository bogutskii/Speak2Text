import React from 'react';
import { connect } from 'react-redux';
import { toggleRule } from '../actions/transcriptActions';

const RulesComponent = ({ rules, toggleRule }) => {
  return (
    <div className='options-main'>
      <h2>Options</h2>
      <div className='options-list'>
        {rules.map(rule => (
          <div key={rule.name} className='option-item'>
            <label className='option-label'>
              <input
                type="checkbox"
                checked={rule.active}
                onChange={() => toggleRule(rule.name)}
                className='option-checkbox'
              />
              {rule.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  rules: state.transcript.rules,
});

const mapDispatchToProps = {
  toggleRule,
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);
