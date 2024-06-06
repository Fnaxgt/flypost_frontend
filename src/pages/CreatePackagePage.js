import React, {useEffect, useState} from 'react';

import './CreatePackagePage.css';
import InputComponent from "../components/InputComponent";
import ComboboxComponent from "../components/ComboboxComponent";
import axios from "axios";

const CreatePackagePage = () => {
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:3001/offices')
            .then((response) => {
                setOffices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }, []);

    function handleConfirmation() {
        console.log("Package created");
    }

    return (
        <div className={'createPackageContainer'}>
            <h1>Оформлення посилки</h1>
            <h2>Введіть дані про посилку</h2>
            <div className="infoContainersPackage">
                <div className="senderPackageInfo">
                    <h1>Відправник</h1>
                    <InputComponent
                        className={"sFirstName"}
                        id={"senderFirstName"}
                        label={"ПІБ відправника"}
                        type={"text"}
                        name={"senderFirstName"}
                        required={true}
                        placeholder={"Введіть ПІБ..."}
                    />
                    <InputComponent
                        className={"sEmail"}
                        id={"senderEmail"}
                        label={"Email відправника"}
                        type={"text"}
                        name={"senderEmail"}
                        required={true}
                        placeholder={"Введіть елктронну пошту..."}
                    />
                    <InputComponent
                        className={"sPhone"}
                        id={"senderFirstName"}
                        label={"ПІБ відправника"}
                        type={"text"}
                        name={"senderFirstName"}
                        required={true}
                        placeholder={"Введіть ПІБ..."}
                    />
                </div>
                <div className="packageHorizontalLine"></div>
                <div className="packageInfo">
                    <h1>Посилка</h1>
                    <div className="packageSizeContainer">
                        <InputComponent
                            className={"pInput"}
                            id={"packageLength"}
                            label={"Довжина"}
                            type={"text"}
                            name={"packageLength"}
                            required={true}
                        />
                        <InputComponent
                            className={"pInput"}
                            id={"packageWidth"}
                            label={"Ширина"}
                            type={"text"}
                            name={"packageWidth"}
                            required={true}
                        />
                        <InputComponent
                            className={"pInput"}
                            id={"packageHeight"}
                            label={"Висота"}
                            type={"text"}
                            name={"packageHeight"}
                            required={true}
                        />
                    </div>
                    <div className="packageWeightContainer">
                        <InputComponent
                            className={"pWeight"}
                            id={"packageWeight"}
                            label={"Вага посилки"}
                            type={"text"}
                            name={"packageWeight"}
                            required={true}
                            placeholder={"Вага в кг"}
                        />
                        <div className="packageCheckbox">
                            <input type="checkbox" id="fragile" name="fragile"/>
                            <label htmlFor="fragile">Крихке</label>
                        </div>
                        <div className="packageCheckbox">
                            <input type="checkbox" id="moisture" name="moisture"/>
                            <label htmlFor="moisture">Берегти від вологи</label>
                        </div>
                    </div>
                    <InputComponent
                        className={"pPrice"}
                        id={"packagePrice"}
                        label={"Ціна посилки"}
                        type={"text"}
                        name={"packagePrice"}
                        required={true}
                        placeholder={"Ціна в грн"}
                    />
                </div>
                <div className="packageHorizontalLine"></div>
                <div className="receiverPackageInfo">
                    <h1>Отримувач</h1>
                    <InputComponent
                        className={"rName"}
                        id={"receiverName"}
                        label={"ПІБ отримувача"}
                        type={"text"}
                        name={"receiverName"}
                        required={true}
                        placeholder={"Введіть ПІБ..."}
                    />
                    <InputComponent
                        className={"rEmail"}
                        id={"receiverEmail"}
                        label={"Email отримувача"}
                        type={"text"}
                        name={"receiverEmail"}
                        required={true}
                        placeholder={"Введіть електронну пошту..."}
                    />
                    <InputComponent
                        className={"rPhone"}
                        id={"receiverPhone"}
                        label={"Телефон отримувача"}
                        type={"text"}
                        name={"receiverPhone"}
                        required={true}
                        placeholder={"Введіть телефон..."}
                    />
                    <ComboboxComponent
                        options={offices}
                        onSelect={(id) => console.log(id)}
                        label={"Відділення"}
                    ></ComboboxComponent>
                </div>
            </div>
            <div className={"confirmButtonDiv"}>
                <button className={"btn btn-primary confirmButton"} onClick={handleConfirmation}>Оформити</button>
            </div>
        </div>
    );
};

export default CreatePackagePage;