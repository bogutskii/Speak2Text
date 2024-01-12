export const updateFinalTranscript = (finalTranscript) => ({
  type: 'UPDATE_FINAL_TRANSCRIPT',
  payload: finalTranscript
});

export const updateInterimTranscript = (interimTranscript) => ({
  type: 'UPDATE_INTERIM_TRANSCRIPT',
  payload: interimTranscript
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});

export const setMicrophoneError = (error) => ({
  type: 'SET_MICROPHONE_ERROR',
  payload: error
});



export const setInterfaceLanguage = (language) => ({
  type: 'SET_INTERFACE_LANGUAGE',
  payload: language
});

export const setRecognitionLanguage = (language) => ({
  type: 'SET_RECOGNITION_LANGUAGE',
  payload: language
});

export const toggleListening = (isListening) => ({
  type: 'TOGGLE_LISTENING',
  payload: isListening
});

export const resetTranscript = () => ({
  type: 'RESET_TRANSCRIPT'
});
export const setCopiedToClipboard = (value) => ({
  type: 'SET_COPIED_TO_CLIPBOARD',
  payload: value
});

export const loadLanguageFile = (language) => {
  return (dispatch) => {
    import(`../lang/translations_${language}.json`)
      .then(translations => {
        dispatch({
          type: 'SET_INTERFACE_LANGUAGE',
          payload: translations
        });
      })
      .catch(error => {
        console.error("Error loading language file", error);
      });
  };
};
export const setCurrentInterface = (language) => ({
  type: 'SET_CURRENT_INTERFACE_LANGUAGE',
  payload: language
})