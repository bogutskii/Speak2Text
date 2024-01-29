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

export const setAutocorrector = (value) => ({
  type: 'SET_AUTOCORRECTOR',
  payload: value
})

export const useAutocorrector = (text) => ({
  type: 'USE_AUTOCORRECTOR',
  payload: text
})