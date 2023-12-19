import React, { useState } from "react";

const LanguageSelector = ({
  onLanguageChange,
  currentLanguage,
  onRecognitionLanguageChange,
  labelRecognition,
  languages,
}) => {

  if (!languages) {
    languages = [
      { code: "en", name: "Английский" },
      { code: "ru-RU", name: "Русский" },
    ];
  }

  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (selectedValue) => {
    setSelectedLanguage(selectedValue);
    onRecognitionLanguageChange(selectedValue);
  };

  return (
    <div className="language-selector">
      <label htmlFor="recognition-language-select">{labelRecognition}: </label>
      <select
        id="recognition-language-select"
        onChange={(e) => handleLanguageChange(e.target.value)}
        value={selectedLanguage}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
