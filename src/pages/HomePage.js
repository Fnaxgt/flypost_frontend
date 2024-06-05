import React from 'react';

import blogo from '../blogo.png';

import './HomePage.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

const HomePage = () => {
    return (
        <div className={"homeContainer"}>
            <img className={"pageLogo"} src={blogo} alt="logo"/>
            <h1>FLYPOST</h1>
            <h2>Доставляємо швидко, наче повітрям!</h2>
            <h3>Для повного функціоналу рекомендуємо завантажити наш додаток, скориставшись посиланням нижче</h3>
            <div className={"downloadButton"}>
                <a href={"#"}>
                    <span>Завантажити APK</span>
                    <FontAwesomeIcon icon={faDownload} className={"downloadIcon"}/>
                    <div className="iconBackground"></div>
                </a>
            </div>
            <div className="paymentContainer">
                <h3>Вже маєш активне відправлення? Переходь за посиланням нижче, щоб сплатити онлайн</h3>
                <NavLink to={"/payment"} className={"paymentButton"}>
                    <FontAwesomeIcon icon={faCartShopping} className={"paymentIcon"}/>
                    <span>Оплатити посилку за її номером</span>
                    <div className="iconBackground"></div>
                </NavLink>
                <div className="infoContainer">
                    <div className="subInfo">
                        <h3>Ще не знаєш, як відправити посилку?</h3>
                        <div className="horLine"></div>
                        <p>Ми пропонуємо вам відправити посилку за допомогою нашого додатку, який можна завантажити за посиланням вище. Якщо у вас виникли питання, ви завжди можете звернутися до нашої підтримки за номером телефону +380 66 666 66 66 або написати на пошту</p>
                    </div>
                    <div className="subInfo">
                        <h3>Що таке FLYPOST?</h3>
                        <div className="horLine"></div>
                        <p>FLYPOST - це сервіс доставки посилок, який дозволяє вам відправити посилку за допомогою нашого додатку. Ми доставляємо ваші посилки швидко та надійно, а також пропонуємо можливість оплати онлайн. Для того, щоб відправити посилку, вам потрібно завантажити наш додаток та зареєструватися в ньому</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;