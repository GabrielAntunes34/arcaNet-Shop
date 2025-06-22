import React from 'react';
import './Footer.css';
import { FaInstagram, FaLinkedin, FaFacebook, FaRegEnvelope, FaPhone } from 'react-icons/fa'; // Importando os ícones

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-content'>
                <div className="footer-content-links">
                    <h3>Useful Links</h3>
                    <ul>
                        <li className="social-link-item">
                            <FaInstagram className="social-icon" />
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                        <li className="social-link-item">
                            <FaLinkedin className="social-icon" />
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a>
                        </li>
                        <li className="social-link-item"> 
                            <FaFacebook className="social-icon" />
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-content-contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li className='contact-item'>
                            <FaRegEnvelope className="contact-icon" />
                            <p>arcanet@tarot.com</p>
                        </li>

                        <li className='contact-item'>
                            <FaPhone className="contact-icon" />
                            <p>+55 16 99627-8250</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Arcanet. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;