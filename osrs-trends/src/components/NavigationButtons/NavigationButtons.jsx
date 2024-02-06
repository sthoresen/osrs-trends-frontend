import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationButtons = () => {

    // Get the current pathname from the URL
    const { pathname } = useLocation();

    const navBarStyle = {
        display: 'block',
        justifyContent: 'center',
        marginTop: '20px',
        backgroundColor: '#808080', // Set background color for the entire navigation bar
        padding: '10px 0', // Adjust padding for the entire navigation bar
        width: '90vw',
    };

    const navBarItemStyle = {
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'white',
        opacity: 0.8,
        borderRadius: '5px',
        fontWeight: 'bold',
        marginRight: '10px',
        backgroundColor: 'inherit', // Set background color to inherit from the parent
    };

    return (
        <div style={navBarStyle}>
            <Link to="/" style={{ ...navBarItemStyle, opacity: pathname === '/' || pathname === '/osrs-trends-frontend/' ? 1 : 0.65 }}>
                Trends
            </Link>

            <Link to="/returns" style={{ ...navBarItemStyle, opacity: pathname === '/returns' ? 1 : 0.65 }}>
                Returns
            </Link>

            <Link to="/about" style={{ ...navBarItemStyle, opacity: pathname === '/about' ? 1 : 0.65, marginRight: 0 }}>
                About
            </Link>
        </div>
    );
};

export default NavigationButtons;