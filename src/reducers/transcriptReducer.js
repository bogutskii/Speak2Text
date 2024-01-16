const initialState = {
  finalTranscript: "",
  interimTranscript: "",
  copiedToClipboard: false,
  isListening: false,
  microphoneError: false,
  currentRecognitionLanguage: "ru-RU",
  recognitionLanguage: [
    { code: "ru-RU", name: "Russian" },
    { code: "en", name: "English" },
    { code: "uk-UA", name: "Ukrainian" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
  ],
  currentInterfaceLanguage: "en",
  interfaceLanguage: {
    app_title: "Speech Recognition",
    start_button_text: "Start",
    stop_button_text: "Stop",
    reset_button_text: "Reset",
    copy_button_text: "Copy",
    microphone_error_text:
      "Microphone is unavailable. Please check your microphone settings.",
    text_copied_toast: "Text copied to clipboard",
    labelRecognition: "Recognition language",
    button_select_all: "Select all",
    button_unselect_all: "Unselect all",
    rules_title: "Options",
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Spanish" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "it", name: "Italian" },
      { code: "pt", name: "Portuguese" },
      { code: "ru-RU", name: "Russian" },
      { code: "zh-CN", name: "Chinese (Simplified)" },
      { code: "ja", name: "Japanese" },
      { code: "ko", name: "Korean" },
    ],
  },
};

const transcriptReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FINAL_TRANSCRIPT":
      return { ...state, finalTranscript: action.payload };
    case "UPDATE_INTERIM_TRANSCRIPT":
      return { ...state, interimTranscript: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_RECOGNITION_LANGUAGE":
      return { ...state, currentRecognitionLanguage: action.payload };
    case "TOGGLE_LISTENING":
      return { ...state, isListening: !state.isListening };
    case "SET_MICROPHONE_ERROR":
      return { ...state, microphoneError: action.payload };
    case "SET_COPIED_TO_CLIPBOARD":
      return { ...state, copiedToClipboard: action.payload };
    case "SET_INTERFACE_LANGUAGE":
      return { ...state, interfaceLanguage: action.payload };
    case "SET_CURRENT_INTERFACE_LANGUAGE":
      return { ...state, currentInterfaceLanguage: action.payload };
    case "RESET_TRANSCRIPT":
      return {
        ...state,
        finalTranscript: "",
        interimTranscript: "",
        isListening: false,
        microphoneError: false,
      };
    default:
      return state;
  }
};

export default transcriptReducer;
