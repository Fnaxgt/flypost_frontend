import React from 'react';

import blogo from '../blogo.png';

import './HomePage.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faCartShopping} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
    return (
        <div className={"container"}>
            <img className={"pageLogo"} src={blogo} alt="logo"/>
            <h1>FLYPOST</h1>
            <h2>Доставляємо швидко, наче повітрям!</h2>
            <h3>Для повного функціоналу рекомендуємо завантажити наш додаток, скориставшись посиланням нижче</h3>
            <div className={"downloadButton"}>
                <a href={"#"}>
                    <span>Завантажити APK</span>
                    <FontAwesomeIcon icon={faDownload} className={"downloadIcon"}/>
                </a>
            </div>
            <div className="paymentContainer">
                <h3>Вже маєш активне відправлення? Переходь за посиланням нижче, щоб сплатити онлайн</h3>
                <div className="paymentButton">
                    <a href="#">
                        <FontAwesomeIcon icon={faCartShopping} className={"paymentIcon"}/>
                        <span>Оплатити посилку за її номером</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomePage;