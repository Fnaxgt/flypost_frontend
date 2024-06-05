import React from 'react';

import './AboutPage.css';

import wlogo from '../wlogo.png';

const AboutPage = () => {
    return (
        <div className={"aboutPage"}>
            <div className="aboutContainer">
                <div className="infoSubContainer info1">
                    <h3>
                        Ще не знаєш, як відправити посилку?
                    </h3>
                    <div className="infoHorLine"></div>
                    <p>
                        Ми пропонуємо вам відправити посилку за допомогою нашого додатку, який можна завантажити за
                        посиланням вище. Якщо у вас виникли питання, ви завжди можете звернутися до нашої підтримки за
                        номером телефону +380 66 666 66 66 або написати на пошту
                    </p>
                </div>
                <div className="infoSubContainer info2">
                    <h3>Чи можна довіряти?</h3>
                    <div className="infoHorLine"></div>
                    <p></p>
                </div>
            </div>
            <div className="aboutContainer">
                <div className="infoSubContainer info3">
                    <h3>Чи можна відстежити своє відправлення?</h3>
                    <div className="infoHorLine"></div>
                    <p>
                        Так, ви можете відстежити своє відправлення за допомогою нашого додатку. Для цього вам потрібно
                        ввести номер відправлення та натиснути кнопку "Відстежити". Після цього ви побачите, де
                        знаходиться ваша посилка в даний момент
                    </p>
                </div>
                <div className="infoSubContainer info4">
                    <h3>Чи є відшкодування?</h3>
                    <div className="infoHorLine"></div>
                    <p>
                        Так, у вас є можливість відшкодування за втрату посилки. Для цього вам потрібно звернутися до
                        нашої підтримки за номером телефону +380 66 666 66 66 або написати на пошту
                    </p>
                </div>
            </div>
            <footer className={"aboutFooter"}>
                <div className="footerContacts">
                    <h3>Контакти</h3>
                    <p>Телефон: +380 66 666 66 66</p>
                    <p>Email:</p>
                    <img src={wlogo} alt="wlogo"/>
                </div>
                <div className="footerInfo">
                    <h1 className="companyName">
                        FLYPOST
                    </h1>
                    <p>© 2021 FLYPOST. All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;