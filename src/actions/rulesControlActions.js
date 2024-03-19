export const toggleRule = (language, ruleName, params=null) => {
    return {
      type: 'TOGGLE_RULE',
      payload: {
        language,
        ruleName,
        params
      }
    };
  };

export const setAutocorrect = (value) => ({
  type: 'SET_AUTOCORRECT',
  payload: value
})

export const useAutocorrect = (text) => ({
  type: 'USE_AUTOCORRECT',
  payload: text
})

export const addNewRule = (rule,language) => ({
  type: 'ADD_RULES',
  payload: {
    rule, language
  }
})