import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  setInterfaceLanguage,
  setCurrentInterface,
  loadLanguageFile,
} from '../../actions/transcriptActions';

const LanguageInterfaceToggle = ({
  currentInterfaceLanguage,
  setInterfaceLanguage,
  loadLanguageFile,
  setCurrentInterface,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentInterfaceLanguage);
  const languages = { en: 'Eng', ukr: 'Ukr', ru: 'Rus' };

  const handleInterfaceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);
    setInterfaceLanguage(selectedValue);
    loadLanguageFile(selectedValue);
    setCurrentInterface(selectedValue);
  };

  return (
    <div className="interface-language-toggle">
      <select className='interface-language-select' value={selectedLanguage} onChange={handleInterfaceChange}>
        {Object.entries(languages).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInterfaceToggle);
