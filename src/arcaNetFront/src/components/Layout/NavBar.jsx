import React from 'react';
import { Link } from 'react-router-dom'; 
import './NavBar.css';
import logo from '../../assets/react.svg';


const NavBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='navbar'>
            <div className='navbar-brand'>
                <img src={logo} className='navbar-logo-img' alt="Arcanet Logo"/>
                <Link to="/" className='navbar-brand-name'>Arcanet</Link>
            </div>

            <div className='navbar-main-links'>
                <Link to="/products">Products</Link>
                <Link to="/Wheel-of-fortune">Wheel of Fortune</Link>


                {user ? (
                    <Link to="/profile" className="navbar-avatar-link" title={user.name || 'User Profile'} aria-label="User Profile">
                        <img src='#' />
                    </Link>
                ) : (
                    <Link to="/login">
                        <button className="navbar-login-button"> Login </button>
                    </Link>
                )}

                <Link to="/cart" className="navbar-cart-link" aria-label="Shopping Cart">
                    <img src="#" style={{ height: '28px', verticalAlign: 'middle' }} />
                </Link>
            </div>
        </div>
    );
};

export default NavBar;