import React, { useState, useEffect, useRef } from 'react';
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
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const languages = { en: ['EN', 'English'], ukr: ['UA', 'Ukrainian'], ru: ['RU', 'Russian'] };
  const selectRef = useRef(null);

  const handleInterfaceChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);
    setInterfaceLanguage(selectedValue);
    loadLanguageFile(selectedValue);
    setCurrentInterface(selectedValue);
    setIsDropdownExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsDropdownExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);
  const handleFocus = () => {
    setIsDropdownExpanded(true);
  };

  return (
    <div className="interface-language-toggle">
      <select
        className='interface-language-select'
        value={selectedLanguage}
        onChange={handleInterfaceChange}
        onFocus={handleFocus}
      >
        {Object.entries(languages).map(([key, value]) => (
          <option key={key} value={key}>
            {isDropdownExpanded ? value[1] : value[0]}
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
