import {NavLink} from "react-router-dom";

import './HeaderComponent.css';

import wlogo from '../wlogo.png';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket, faRightToBracket} from "@fortawesome/free-solid-svg-icons";

import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from "react-auth-kit/hooks/useSignOut";

const HeaderComponent = () => {
    const auth = useAuthUser();
    const signOut = useSignOut();

    const handleSignOut = () => {
        signOut();
    }

    const username = auth ? auth.username : null;
    const role = auth ? auth.role : 2; //TODO: change to 0
    return (
        <header>
            <nav>
                <div className={"logo"}>
                    <img src={wlogo} alt="logo"/>
                </div>
                <NavLink to={'/'} className={"navButton"}>Головна</NavLink>
                <NavLink to={'/payment'} className={"navButton"}>Оплата посилки</NavLink>
                {role >= 1 && (
                    <>
                        <NavLink to={'/packages'} className={"navButton"}>Список посилок</NavLink>
                        <NavLink to={'/createPackage'} className={"navButton"}>Створити посилку</NavLink>
                    </>
                )}
                {role >= 2 && (
                    <NavLink to={'/employees'} className={"navButton"}>Список співробітників</NavLink>
                )}
                <NavLink to={'/info'} className={"navButton"}>Інформація</NavLink>

                {auth ? (
                    <div className="authButton">
                        {role >= 2 && (
                            <h3>Адміністратор</h3>
                        )}
                        <button onClick={handleSignOut} className={"navButton"}>Вийти</button>
                        <FontAwesomeIcon icon={faRightFromBracket} className={"logOutIcon"}/>
                    </div>
                ) : (
                    <div className="authButton">
                        <NavLink to={'/login'} className={"navButton"}>Увійти</NavLink>
                        <FontAwesomeIcon icon={faRightToBracket} className={"logInIcon"}/>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default HeaderComponent;