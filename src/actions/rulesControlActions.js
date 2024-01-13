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