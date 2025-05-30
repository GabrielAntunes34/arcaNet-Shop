import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import validateData from './authValidation';
import './AuthPages.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// This page implements a Login form component which is interactible and responsible
// To get the user input and send to the server to create a new User in the database

const SignUpPage = () => {  
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        address: '',
        phone: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Indentifies the altered field and changes it into our state
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Checks the data and send it to save the new user at the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true);

        // Checking if every piece of data is under the definitions
        const newErrors = validateData(formData);
        setErrors(newErrors);

        try{
        setLoading(true);

        // We need to use newErrors because setErros is async, but dosen't return a
        // promise. Therefore, we can't trust it :(
        if(Object.keys(newErrors).length === 0) {
            register(formData);

            // Reseting loading state and forwarding to login page
            setLoading(false);
            navigate('/login');
        }

        setLoading(false);
        }
        catch(err) {
            console.log(err);
            console.log('An error has occurred');
        }
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
            <ErrorMessage message={errors && errors.email}/>

            <label htmlFor="phone">Phone:</label>
            <input
                name='phone'
                type="text"
                placeholder='+55(19)991325324'
                value={formData.phone}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors && errors.phone}/>


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
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors && errors.password}/>


            <label htmlFor="confirmPassword">confirmPassword</label>
            <input
                name='confirmPassword'
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
            />
            <ErrorMessage message={errors && errors.confirmPassword}/>


            <button className='form-btn' type='submit'>
                { loading ? 'Verifying...' : 'Submit' }
            </button>
        </form>
        </>
    )
}

export default SignUpPage;