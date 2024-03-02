import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInterfaceLanguage,
  setCurrentInterface,
  loadLanguageFile,
} from '../../actions/transcriptActions';

const LanguageInterfaceToggle = () => {
  const currentInterfaceLanguage = useSelector(state => state.transcript.currentInterfaceLanguage);
  const dispatch = useDispatch();

  const [selectedLanguage, setSelectedLanguage] = useState(currentInterfaceLanguage);
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const languages = { en: ['EN', 'English'], ukr: ['UA', 'Ukrainian'], ru: ['RU', 'Russian'] };
  const selectRef = useRef(null);

  const handleInterfaceChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedLanguage !== selectedValue) {
      setSelectedLanguage(selectedValue);
      dispatch(setInterfaceLanguage(selectedValue));
      dispatch(loadLanguageFile(selectedValue));
      dispatch(setCurrentInterface(selectedValue));
    }
    setIsDropdownExpanded(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsDropdownExpanded(false);
      } else {
        if (isDropdownExpanded) {
          setIsDropdownExpanded(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownExpanded]); 

  const toggleDropdown = () => {
    setIsDropdownExpanded(true);
  };

  return (
    <div className="interface-language-toggle">
      <select
        className='interface-language-select'
        value={selectedLanguage}
        onChange={handleInterfaceChange}
        onClick={toggleDropdown} 
        ref={selectRef}
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

export default LanguageInterfaceToggle;
