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
    const fieldRules = this.rules[fieldName] || [];
    this.errors[fieldName] = [];
    
    for (const rule of fieldRules) {
      if (!rule.validate(value)) {
        this.errors[fieldName].push(rule.message);
      }
    }
    
    return this.errors[fieldName].length === 0;
  }

  validate() {
    this.clearErrors();
    let isValid = true;
    const formData = new FormData(this.form);
    
    for (const [fieldName, rules] of Object.entries(this.rules)) {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const value = field.value;
        if (!this.validateField(fieldName, value)) {
          isValid = false;
        }
      }
    }
    
    return isValid;
  }

  displayErrors() {
    for (const [fieldName, errors] of Object.entries(this.errors)) {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field && errors.length > 0) {
        field.style.borderColor = '#dc3545';
        let errorDiv = field.parentElement.querySelector('.error-message');
        if (!errorDiv) {
          errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          field.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = errors[0];
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
      } else if (field) {
        field.style.borderColor = '';
        const errorDiv = field.parentElement.querySelector('.error-message');
        if (errorDiv) {
          errorDiv.remove();
        }
      }
    }
  }

  clearErrors() {
    this.errors = {};
    const errorMessages = this.form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    const fields = this.form.querySelectorAll('input, select, textarea');
    fields.forEach(field => field.style.borderColor = '');
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
