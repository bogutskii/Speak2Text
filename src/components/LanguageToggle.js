import React from 'react';

const LanguageToggle = ({ onLanguageChange, language}) => {
  return (
    <div className="language-toggle">
      <button className={`glow-button ${language==='en' ? 'lang':'empty'}`} onClick={() => onLanguageChange('en')}>Eng</button>
      <button className={`glow-button ${language==='ru' ? 'lang':'empty'}`} onClick={() => onLanguageChange('ru')}>Рус</button>
    </div>
  );
};

export default LanguageToggle;
