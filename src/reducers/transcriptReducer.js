
const initialState = {
  finalTranscript: '',
  interimTranscript: '',
  copiedToClipboard: false,
  isListening: false,
  microphoneError: false,
  currentRecognitionLanguage: "en",
  recognitionLanguage:[
    { "code": "en", "name": "English" },
    { "code": "es", "name": "Spanish" },
    { "code": "fr", "name": "French" },
    { "code": "de", "name": "German" },
    { "code": "it", "name": "Italian" },
    { "code": "pt", "name": "Portuguese" },
    { "code": "ru-RU", "name": "Russian" },
    { "code": "zh-CN", "name": "Chinese (Simplified)" },
    { "code": "ja", "name": "Japanese" },
    { "code": "ko", "name": "Korean" }
  ],
  currentInterfaceLanguage: "en",
  interfaceLanguage: {
      "app_title": "Speech Recognition",
      "start_button_text": "Start",
      "stop_button_text": "Stop",
      "reset_button_text": "Reset",
      "copy_button_text": "Copy",
      "microphone_error_text": "Microphone error",
      "text_copied_toast": "Text copied to clipboard",
      "labelRecognition": "Recognition language",
      "languages": [
        { "code": "en", "name": "English" },
        { "code": "es", "name": "Spanish" },
        { "code": "fr", "name": "French" },
        { "code": "de", "name": "German" },
        { "code": "it", "name": "Italian" },
        { "code": "pt", "name": "Portuguese" },
        { "code": "ru-RU", "name": "Russian" },
        { "code": "zh-CN", "name": "Chinese (Simplified)" },
        { "code": "ja", "name": "Japanese" },
        { "code": "ko", "name": "Korean" }
      ]
  },
    rules: [
      { name: 'точка', active: false , symbol: '.'},
      { name: 'запятая', active: false, symbol: ',' }
    ],
  };
  
const transcriptReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_RULE':
      return {
        ...state,
        rules: state.rules.map((rule) =>
          rule.name === action.payload ? { ...rule, active: !rule.active } : rule
        ),
      };
    case 'UPDATE_FINAL_TRANSCRIPT':
      return { ...state, finalTranscript: action.payload };
    case 'UPDATE_INTERIM_TRANSCRIPT':
      return { ...state, interimTranscript: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RECOGNITION_LANGUAGE':
      return { ...state, currentRecognitionLanguage: action.payload };
    case 'TOGGLE_LISTENING':
      return { ...state, isListening: !state.isListening };
    case 'SET_MICROPHONE_ERROR':
      return { ...state, microphoneError: action.payload };
    case 'SET_COPIED_TO_CLIPBOARD':
      return { ...state, copiedToClipboard: action.payload };
    case 'SET_INTERFACE_LANGUAGE':
        console.log('action:', {...action.payload});
        return { ...state, interfaceLanguage: {...action.payload} };
    case "SET_CURRENT_INTERFACE_LANGUAGE":
          return { ...state, currentInterfaceLanguage: action.payload };
    case 'RESET_TRANSCRIPT':
      return {
        ...state,
        finalTranscript: '',
        interimTranscript: '',
        isListening: false,
      }
    default:
      return state;
  }
};

export default transcriptReducer;
