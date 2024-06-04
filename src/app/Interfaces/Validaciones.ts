import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
// Funcion para validar el DNI
export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const dniPattern = /^\d{8}[A-Za-z]$/;

    if (!dniPattern.test(value)) {
      return { 'dniFormatoInvalido': { value: value } };
    }

    const dniDigits = value.substr(0, 8);
    const dniLetter = value.charAt(8).toUpperCase();
    const validLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';

    const calculatedLetter = validLetters.charAt(parseInt(dniDigits, 10) % 23);

    if (calculatedLetter !== dniLetter) {
      return { 'dniInvalido': { value: value } };
    }

    return null;
  };
}

// Metodo para validar si se ha insertado un archivo
export function fileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    return file ? null : { requiredFile: true };
  };
}


// Metodo para validar la contraseña
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}

// Metodo para validar
export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const birthDate = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age >= minAge ? null : { underage: true };
  };
}

