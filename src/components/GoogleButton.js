import React from 'react';

import googleLogo from '../glogo.png';
import './GoogleButton.css';

const GoogleButton = (props) => {
    const buttonText = props.text || "Увійти через Google";
    const buttonState = props.disabled || false;
    return (
        <button className={"googleButton"} disabled={buttonState}>
            <img src={googleLogo} alt="google" className={"buttonLogo"}/>
            <span>{buttonText}</span>
        </button>
    );
};

export default GoogleButton;