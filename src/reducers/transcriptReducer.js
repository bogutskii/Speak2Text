
const initialState = {
    finalTranscript: "",
    interimTranscript: "",
    rules: [
      { name: 'Точка', active: false },
      { name: 'Запятая', active: false },
    ],
  };
  
  const transcriptReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_RULE':
        return {
          ...state,
          rules: state.rules.map((rule) =>
            rule.name === action.ruleName ? { ...rule, active: !rule.active } : rule
          ),
        };
      case 'UPDATE_FINAL_TRANSCRIPT':
        return { ...state, finalTranscript: action.payload };
      case 'UPDATE_INTERIM_TRANSCRIPT':
        return { ...state, interimTranscript: action.payload };
      default:
        return state;
    }
  };
  
  export default transcriptReducer;
  