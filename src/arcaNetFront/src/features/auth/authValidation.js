// Auxiliar function that mplements validations for each field

const validateData = (formData, verifyPass=true) => {
    const errors = {};
    const phoneRegex = /^\+?[\d\s\-().]{7,}$/;  // Phones may have + and must be at least 7 digits-long
    // Passwords must have at least an symble, an capital later, an lower case letter a digit and be at least 6 digits long
    const passRegex = /^(?=.*[^A-Za-z0-9])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // Validating the user data fields
    if (formData.email && !formData.email.includes('@'))
        errors.email = 'Invalid email';
    if (formData.phone && !phoneRegex.test(formData.phone))
        errors.phone = 'Invalid phone number';

    // Password policy check-ups
    if(verifyPass) {
        if(formData.password && !passRegex.test(formData.password))
            errors.password = 'Passwords have at least 6 characters with symbols, numbers and capital letters';
        if(formData.password && formData.confirmPassword && !(formData.password === formData.confirmPassword))
            errors.confirmPassword = 'The passwords don\'t match';
    }

    // Setting the new state for erros
    return errors;
}

export default validateData;