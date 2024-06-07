import React, {useEffect, useState} from 'react';

import './CreatePackagePage.css';
import InputComponent from "../components/InputComponent";
import ComboboxComponent from "../components/ComboboxComponent";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const CreatePackagePage = () => {
    const auth = useAuthUser();

    const username = auth ? auth.username : null;

    const [offices, setOffices] = useState([]);

    const [senderFirstName, setSenderFirstName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderPhone, setSenderPhone] = useState('');

    const [packageLength, setPackageLength] = useState('');
    const [packageWidth, setPackageWidth] = useState('');
    const [packageHeight, setPackageHeight] = useState('');
    const [packageWeight, setPackageWeight] = useState('');
    const [packagePrice, setPackagePrice] = useState('');
    const [isFragile, setIsFragile] = useState(false);
    const [isMoisture, setIsMoisture] = useState(false);

    const [receiverName, setReceiverName] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [receiverPhone, setReceiverPhone] = useState('');
    const [officeId, setOfficeId] = useState('');

    const handleInputChange = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case 'senderFirstName':
                setSenderFirstName(event.target.value);
                break;
            case 'senderEmail':
                setSenderEmail(event.target.value);
                break;
            case 'senderPhone':
                setSenderPhone(event.target.value);
                break;
            case 'packageLength':
                setPackageLength(event.target.value);
                break;
            case 'packageWidth':
                setPackageWidth(event.target.value);
                break;
            case 'packageHeight':
                setPackageHeight(event.target.value);
                break;
            case 'packageWeight':
                setPackageWeight(event.target.value);
                break;
            case 'packagePrice':
                setPackagePrice(event.target.value);
                break;
            case 'receiverName':
                setReceiverName(event.target.value);
                break;
            case 'receiverEmail':
                setReceiverEmail(event.target.value);
                break;
            case 'receiverPhone':
                setReceiverPhone(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleCheckboxChange = (event) => {
        switch (event.target.name) {
            case 'fragile':
                setIsFragile(event.target.checked);
                break;
            case 'moisture':
                setIsMoisture(event.target.checked);
                break;
            default:
                break;
        }
    }

    const handleComboboxChange = (event) => {
        setOfficeId(event.target.value);
    }

    const handleConfirmation = () => {
        // add isFragile and isMoisture to description string
        const packageDescription = `Крихке: ${isFragile ? 'Так' : 'Ні'}, Берегти від вологи: ${isMoisture ? 'Так' : 'Ні'}`;
        const packageData = {
            sender: {
                email: senderEmail,
            },
            package: {
                length: packageLength,
                width: packageWidth,
                height: packageHeight,
                weight: packageWeight,
                insurance: packagePrice,
                description: packageDescription
            },
            receiver: {
                email: receiverEmail,
                officeId: officeId
            },
            username: username
        };

        console.log(packageData);

        axios.post('http://localhost:3001/packages', packageData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:3001/offices')
            .then((response) => {
                setOffices(response.data);
                setOfficeId(response.data[0].id);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                        value={senderFirstName}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        className={"sEmail"}
                        id={"senderEmail"}
                        label={"Email відправника"}
                        type={"text"}
                        name={"senderEmail"}
                        required={true}
                        placeholder={"Введіть елктронну пошту..."}
                        value={senderEmail}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        className={"sPhone"}
                        id={"senderPhone"}
                        label={"Телефон відправника"}
                        type={"text"}
                        name={"senderPhone"}
                        required={true}
                        placeholder={"Введіть телефон..."}
                        value={senderPhone}
                        onChange={handleInputChange}
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
                            value={packageLength}
                            onChange={handleInputChange}
                        />
                        <InputComponent
                            className={"pInput"}
                            id={"packageWidth"}
                            label={"Ширина"}
                            type={"text"}
                            name={"packageWidth"}
                            required={true}
                            value={packageWidth}
                            onChange={handleInputChange}
                        />
                        <InputComponent
                            className={"pInput"}
                            id={"packageHeight"}
                            label={"Висота"}
                            type={"text"}
                            name={"packageHeight"}
                            required={true}
                            value={packageHeight}
                            onChange={handleInputChange}
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
                            value={packageWeight}
                            placeholder={"Вага в кг"}
                            onChange={handleInputChange}
                        />
                        <div className="packageCheckbox">
                            <input type="checkbox" id="fragile" name="fragile" onChange={handleCheckboxChange}/>
                            <label htmlFor="fragile">Крихке</label>
                        </div>
                        <div className="packageCheckbox">
                            <input type="checkbox" id="moisture" name="moisture" onChange={handleCheckboxChange}/>
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
                        value={packagePrice}
                        onChange={handleInputChange}
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
                        value={receiverName}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        className={"rEmail"}
                        id={"receiverEmail"}
                        label={"Email отримувача"}
                        type={"text"}
                        name={"receiverEmail"}
                        required={true}
                        placeholder={"Введіть електронну пошту..."}
                        value={receiverEmail}
                        onChange={handleInputChange}
                    />
                    <InputComponent
                        className={"rPhone"}
                        id={"receiverPhone"}
                        label={"Телефон отримувача"}
                        type={"text"}
                        name={"receiverPhone"}
                        required={true}
                        placeholder={"Введіть телефон..."}
                        value={receiverPhone}
                        onChange={handleInputChange}
                    />
                    <ComboboxComponent
                        options={
                            offices.map((office) => {
                                return {
                                    id: office.id,
                                    name: `№${office.office_number}, ${office.address}`
                                }
                            })
                        }
                        onChange={handleComboboxChange}
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