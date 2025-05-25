import React from 'react';
import './ErrorMessage.css'

// This component only renders a text if it recieves an error
// Message as prop from the logic of a father component

const ErrorMessage = ({message}) => {
    return (
        <>
       {message && <i><small className='error-msg'>{message}</small></i>}
        </>
    );
};

export default ErrorMessage;