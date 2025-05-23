import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer-content'>
                <div className="footer-content-links">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>Instagram</li>
                        <li>Linkedin</li>
                        <li>Facebook</li>
                    </ul>
                </div>

                <div className="footer-content-contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Email - arcanet@tarot.com</li>
                        <li>Phone - +55 16 99627-8250</li>
                        <li>Gabiru - (16) 99627-8250</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Arcanet. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export default Footer;