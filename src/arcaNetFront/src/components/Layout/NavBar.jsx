import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/arcanet.png';
import ProfileDropdown from './ProfileDropdown';
import Button from '../Button/Button.jsx';

const NavBar = () => {
    const [user, setUser] = useState(null);

    // Efeito para carregar o usuário do localStorage na montagem do componente
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário do localStorage:", error);
            localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    // Função para ser chamada pelo ProfileDropdown após o logout
    const handleLogoutInNavBar = () => {
        setUser(null);
    };

    return (
        <div className='navbar'>

            {/* Esquerda da navbar */}
            <div className='navbar-brand'>
                <Link to="/"> <img src={logo} className='navbar-logo-img' alt="Arcanet Logo"/> </Link>
                
                <Link to="/" className='navbar-brand-name'>Arcanet</Link>
            </div>


            {/* Direita da navbar */}
            <div className='navbar-main-links'>
                <Link to="/products">Products</Link>
                <Link to="/Wheel-of-fortune">Wheel of Fortune</Link>


                {/* Se estiver logado, coloca ProfileDropdown, se não, coloca botão de login*/}
                {user ? (
                    <ProfileDropdown user={user} onLogout={handleLogoutInNavBar} />
                ) : (
                    <Link to="/login">
                        <Button variant="primary" className="navbar-login-button-custom">
                            Login
                        </Button>
                    </Link>
                )}

                {/* Ícone de carrinho */}
                <Link to="/cart" className="navbar-cart-link" aria-label="Shopping Cart">
                    <svg height="30" viewBox="0 0 21 21" width="30" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" transform="translate(2 4)"><path d="m3 2.5h12.5l-1.5855549 5.54944226c-.2453152.85860311-1.0300872 1.45055774-1.9230479 1.45055774h-6.70131161c-1.01909844 0-1.87522688-.76627159-1.98776747-1.77913695l-.80231812-7.22086305h-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><g fill="currentColor"><circle cx="5" cy="12" r="1"/><circle cx="13" cy="12" r="1"/></g></g></svg>
                </Link>
            </div>
        </div>
    );
};

export default NavBar;