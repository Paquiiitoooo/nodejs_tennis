export class FormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.errors = {};
    this.rules = {};
  }

  addRule(fieldName, rule) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
    }
    this.rules[fieldName].push(rule);
  }

  validateField(fieldName, value) {
  }

  validate() {
  }

  displayErrors() {
  }

  clearErrors() {
    this.errors = {};
  }
}

export class ValidationRule {
  constructor(validateFn, message) {
    this.validate = validateFn;
    this.message = message;
  }
}

export const Rules = {
  required: new ValidationRule(
    (value) => value && value.trim() !== '',
    'Ce champ est obligatoire'
  ),
  minLength: (min) => new ValidationRule(
    (value) => value && value.length >= min,
    `Ce champ doit contenir au moins ${min} caractères`
  ),
  email: new ValidationRule(
    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    'Format d\'email invalide'
  )
};
