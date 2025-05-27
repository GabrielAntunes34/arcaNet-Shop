// ProfileDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';


/*
  user -> prop do user
  onLogout -> função que é chamada quando o usuário clica em logout
*/
const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    setIsOpen(false); 
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>

      {/* Botão de perfil */}
      <button onClick={toggleDropdown} className="profile-button" aria-haspopup="true" aria-expanded={isOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      </button>

      {/* Dropdown menu */}
      {/* Se o dropdown estiver aberto, renderiza o menu */}
      {isOpen && (
        <div className="dropdown-menu" role="menu">
          <ul>
            <li>
              <Link to="/profile" onClick={() => setIsOpen(false)} role="menuitem">
                My account
              </Link>
            </li>


            {/*===========================================*/}
            {/* Itens somente de Admin */}
            {user.role === 'admin' && (
              <>
                <li>
                  <Link to="/manage-products" onClick={() => setIsOpen(false)} role="menuitem">
                    Manage products 
                  </Link>
                </li>
                <li>
                  <Link to="/manage-users" onClick={() => setIsOpen(false)} role="menuitem">
                    Manage users 
                  </Link>
                </li>
                <li>
                  <Link to="/manage-categories" onClick={() => setIsOpen(false)} role="menuitem">
                    Manage categories
                  </Link>
                </li>
              </>
            )}
            {/*===========================================*/}


            
            <li className="dropdown-separator"></li>
            <li>
              {/* Botão de Logout chama handleLogoutClick */}
              <button onClick={handleLogoutClick} className="logout-button" role="menuitem">
                Logout
              </button>
            </li>

          </ul>


        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;