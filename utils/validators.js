const isString = str => typeof str === 'string' || str instanceof String;

export const firstLetterCaseValidator = value => isString(value) && value[0] && value[0] === value[0].toUpperCase();