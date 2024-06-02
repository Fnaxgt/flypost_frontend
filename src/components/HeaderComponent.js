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
                <NavLink to={'/'} className={"navButton"}>Головна</NavLink>
                <NavLink to={'/payment'} className={"navButton"}>Оплата посилки</NavLink>
                <NavLink to={'/info'} className={"navButton"}>Інформація</NavLink>
                <div className="authButton">
                    <NavLink to={'/login'} className={"navButton"}>Увійти</NavLink>
                    <FontAwesomeIcon icon={faRightToBracket} className={"logInIcon"}/>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;