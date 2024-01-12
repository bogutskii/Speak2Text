export const toggleRule = (language, ruleName) => {
    return {
      type: 'TOGGLE_RULE',
      payload: {
        language:language,
        ruleName:ruleName
      }
    };
  };