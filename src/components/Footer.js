import React from 'react';
import './css/Footer.css'; // Make sure to import the CSS

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>Copyright © {year} | Developed by Kaung Htet Zaw. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
