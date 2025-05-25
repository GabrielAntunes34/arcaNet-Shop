import { useState } from 'react';
import { useAuth } from './AuthContext';
import './AuthPages.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// This page implements a Login form component which is interactible and responsible
// To get the user input and send to the server to create a new User in the database

const SignUpPage = () => {  
    const [formData, setFormData] = useState({
        email: '',
        address: '',
        phone: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Indentifies the altered field and changes it into our state
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        //console.log(formData);
    }

    // Implements validations for each field
    const validateData = () => {
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
        if(formData.password && !passRegex.test(formData.password))
            errors.password = 'Passwords have at least 6 characters with symbols, numbers and capital letters';
        if(formData.password && formData.confirmPassword && !(formData.password === formData.confirmPassword))
            errors.confirmPassword = 'The passwords don\'t match';

        // Setting the new state for erros
        setErrors(errors);
    }

    // Checks the data and send it to save the new user at the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateData();

        setLoading(true);
        if(!errors)
            console.log('You can signup!')
            // Should I put the fetch over here?

        setLoading(false);
    }

    return (
        <>
        <h1>Sign up</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                name='name'
                type="text"
                placeholder='Djavan Moreno'
                value={formData.name}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                name='email'
                type="text"
                placeholder='example@gmail.com'
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors.email}/>

            <label htmlFor="phone">Phone:</label>
            <input
                name='phone'
                type="text"
                placeholder='+55(19)991325324'
                value={formData.phone}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors.phone}/>


            <label htmlFor="address">Adress:</label>
            <textarea
                name='address'
                type="text"
                rows="4"
                value={formData.address}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                name='password'
                type="text"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors.password}/>


            <label htmlFor="confirmPassword">confirmPassword</label>
            <input
                name='confirmPassword'
                type="text"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors.confirmPassword}/>


            <button className='form-btn' type='submit'>
                { loading ? 'Verifying...' : 'Submit' }
            </button>
        </form>
        </>
    )
}

export default SignUpPage;