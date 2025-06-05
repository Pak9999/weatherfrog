import React from 'react';
import './loading-spinner.css';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = "Loading...", 
    size = 'medium' 
}) => {
    return (
        <div className="loading-container">
            <div className={`loading-spinner ${size}`}>
                <div className="spinner"></div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
