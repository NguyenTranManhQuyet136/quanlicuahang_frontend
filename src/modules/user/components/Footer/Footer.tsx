import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2025 Copyright:
                <a className="text-dark" href="https://aerotech.com/"> Aero Tech</a>
            </div>
        </footer>
    );
};

export default Footer;
