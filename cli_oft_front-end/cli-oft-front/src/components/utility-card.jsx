import React from 'react';
import { Link } from 'react-router-dom';

const UtilityCard = ({ icon, title, link }) => {
    return (

        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className="utility-card">
                <img src={icon} className="card-icon" alt={title} />
                <h2 className="card-title">{title}</h2>
            </div>
        </Link>

    );
};

export default UtilityCard;
