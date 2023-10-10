
const initialState = {
    finalTranscript: "",
    interimTranscript: "",
  };
  
  const transcriptReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_FINAL_TRANSCRIPT':
        return { ...state, finalTranscript: action.payload };
      case 'UPDATE_INTERIM_TRANSCRIPT':
        return { ...state, interimTranscript: action.payload };
      default:
        return state;
    }
  };
  
  export default transcriptReducer;
  