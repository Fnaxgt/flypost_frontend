import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

import './HeaderComponent.css';

import wlogo from '../wlogo.png';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";

const HeaderComponent = () => {
    return (
        <header>
            <nav>
                <div className={"logo"}>
                    <img src={wlogo} alt="logo"/>
                </div>
                <NavLink to={'/'}>Головна</NavLink>
                <NavLink to={'/payment'}>Оплата посилки</NavLink>
                <NavLink to={'/info'}>Інформація</NavLink>
                <div className="authContainer">
                    <NavLink to={'/login'}>Увійти</NavLink>
                    <FontAwesomeIcon icon={faRightToBracket} className={"logInIcon"}/>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;