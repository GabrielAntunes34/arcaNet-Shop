import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import './AuthPages.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// This page implements a Login form component which is interactible and responsible
// To get the user input and send to the server to login

const LoginPage = () => {
    // Defining states for the login credentials: email:password
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Defining states to auxiliate the UX
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Form submition handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // if Logged, it should return the user to the home page
        const success = await login(email, password);
        if(success)
            navigate('/');
        else {
            setError('Wrong email or password');
        }
        
        setLoading(false);
    }

    return (
        <>
        <h1>Login</h1>

        {/* This p only appears with an error in submition */}
        <ErrorMessage message={error}/>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                name="email"
                type="text"
                value = {email}
                onChange = {e => setEmail(e.target.value)}
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                name="password"
                type="password" 
                value={password}
                onChange = {e => setPassword(e.target.value)}
                required
            />

            {/* Button may inform if we are expecting a new request */}
            <button className='form-btn' type="submit" disabled={loading}>
                { loading ? 'Verifying...' : 'Submit' }
            </button>
            
              <Link to='/signup'>Do not have an account? Sign Up!</Link>

        </form>
        </>
    )
}

export default LoginPage;