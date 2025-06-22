// Auxiliar function that implements validations for each field

const validateData = (formData, verifyPass=true) => {
    const errors = {};
    const phoneRegex = /^[\d\s\-().]{7,}$/;  // Phones may have digits, spaces, hyphens, parentheses and dots, must be at least 7 characters
    const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;  // Address may have letters, numbers, spaces, commas, dots and hyphens
    // Passwords must have at least an symble, an capital later, an lower case letter a digit and be at least 6 digits long
    const passRegex = /^(?=.*[^A-Za-z0-9])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // Validating the user data fields
    if (formData.email && !formData.email.includes('@'))
        errors.email = 'Invalid email';
    
    // Phone validation - only if not empty
    if (formData.phone && formData.phone.trim() !== '' && !phoneRegex.test(formData.phone))
        errors.phone = 'Invalid phone number - only digits, spaces, hyphens, parentheses and dots allowed';

    // Address validation - only if not empty
    if (formData.address && formData.address.trim() !== '' && !addressRegex.test(formData.address))
        errors.address = 'Invalid address - only letters, numbers, spaces, commas, dots and hyphens allowed';

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