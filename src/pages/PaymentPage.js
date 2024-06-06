import React, {useEffect} from 'react';

import './PaymentPage.css';
import GoogleButton from "../components/GoogleButton";
import {useLocation} from "react-router-dom";
import InputComponent from "../components/InputComponent";
import axios from "axios";

import aeLogo from "../aeLogo.png";
import visaLogo from "../visaLogo.png";
import mastercardLogo from "../mastercardLogo.png";

const PaymentPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [packageId, setPackageId] = React.useState(searchParams.get('packageId'));
    const [packageData, setPackageData] = React.useState(null);
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardDate, setCardDate] = React.useState("");
    const [cardCVV, setCardCVV] = React.useState("");
    const [cardHolder, setCardHolder] = React.useState("");

    const [cardNumberValid, setCardNumberValid] = React.useState(false);
    const [cardDateValid, setCardDateValid] = React.useState(false);

    const paymentData = {
        packageId: packageId,
        cardNumber: cardNumber,
        cardDate: cardDate,
        cardCVV: cardCVV,
        cardHolder: cardHolder
    }
    useEffect(() => {
        if (packageId) {
            axios.get(`https://localhost:3001/packages/${packageId}`)
                .then((response) => {
                    setPackageData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setPackageData(0);
        }
    }, [packageId]);

    useEffect(() => {
        // Validate card number
        const cardNumberValid = cardNumber.length === 16;

        // Validate card date
        const cardDateParts = cardDate.split('/');
        const cardMonth = parseInt(cardDateParts[0], 10);
        const cardYear = parseInt(cardDateParts[1], 10);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // get last two digits of year
        const currentMonth = currentDate.getMonth() + 1; // get month (1-12)
        const cardDateValid = cardMonth >= 1 && cardMonth <= 12 && cardYear >= currentYear && (cardYear > currentYear || cardMonth >= currentMonth);

        // Update state
        setCardNumberValid(cardNumberValid);
        setCardDateValid(cardDateValid);
    }, [cardNumber, cardDate]);

    function handlePayment() {
        axios.post('https://localhost:3001/payments', paymentData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={"paymentCardContainer"}>
            <h1 className={"paymentHeader"}>Оплата посилки</h1>
            <InputComponent
                className={"paymentPackageIdInput"}
                id={"packageId"}
                label={"Номер посилки"}
                type={"text"}
                name={"packageId"}
                required={true}
                placeholder={"Введіть номер посилки..."}
                error={"Посилка не знайдена"}
                valid={packageData !== null}
                onChange={(e) => setPackageId(e.target.value)}
            />
            <div className="paymentDataFields">
                <div className="paymentDataCreditCard">
                    <div className="creditCardTypeSelector">
                        <div className="creditCardType">
                            <img src={visaLogo} alt="Visa"/>
                        </div>
                        <div className="creditCardType">
                            <img src={mastercardLogo} alt="Mastercard"/>
                        </div>
                        <div className="creditCardType">
                            <img src={aeLogo} alt="American Express"/>
                        </div>
                    </div>
                    <InputComponent
                        className={"paymentCardNumber payInput"}
                        id={"cardNumber"}
                        label={"Номер картки"}
                        type={"text"}
                        name={"cardNumber"}
                        required={true}
                        placeholder={"Введіть номер картки..."}
                        error={"Неправильний номер картки"}
                        valid={cardNumberValid}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <div className="additionalCardData">
                        <InputComponent
                            className={"paymentCardDate payInput"}
                            id={"cardDate"}
                            label={"Термін дії"}
                            type={"text"}
                            name={"cardDate"}
                            required={true}
                            placeholder={"MM/YY"}
                            error={"Неправильний термін дії"}
                            valid={cardDateValid}
                            onChange={(e) => setCardDate(e.target.value)}
                        />
                        <InputComponent
                            className={"paymentCardCVV payInput"}
                            id={"cardCVV"}
                            label={"CVV"}
                            type={"text"}
                            name={"cardCVV"}
                            required={true}
                            placeholder={"CVV"}
                            valid={true}
                            onChange={(e) => setCardCVV(e.target.value)}
                        />
                    </div>
                    <InputComponent
                        className={"paymentCardHolder payInput"}
                        id={"cardHolder"}
                        label={"Власник картки"}
                        type={"text"}
                        name={"cardHolder"}
                        required={true}
                        placeholder={"Введіть ім'я власника..."}
                        error={"Неправильне ім'я власника"}
                        valid={true}
                        onChange={(e) => setCardHolder(e.target.value)}
                    />
                    <button className="btn btn-primary paymentConfirmButton" onClick={handlePayment}
                            disabled={!cardNumberValid || !cardDateValid || !cardHolder || !cardCVV}
                    >Сплатити</button>

                </div>
                <div className="paymentSeparator">
                    або
                </div>
                <div className="paymentGooglePay">
                    <p>
                        Оплатити за допомогою Google Pay
                    </p>
                    <GoogleButton
                        text={"Pay"}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;