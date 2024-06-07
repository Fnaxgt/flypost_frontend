import React, {useEffect, useState} from 'react';

import './CreateEmployeePage.css';
import InputComponent from "../components/InputComponent";
import ComboboxComponent from "../components/ComboboxComponent";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';

//faTimes
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CreateEmployeePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [startWork, setStartWork] = useState('');
    const [salary, setSalary] = useState('');
    const [userId, setUserId] = useState('');
    const [officeId, setOfficeId] = useState('');

    const [offices, setOffices] = useState([]);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/offices')
            .then((response) => {
                setOffices(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);
        document.getElementById('startWork').value = currentDate.toISOString().substr(0, 10);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/employees', {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                phone: phone,
                email: email,
                start_work: startWork,
                salary: salary,
                user_id: userId,
                office_id: officeId
            });
            if (response.status === 200) {
                alert('Працівника успішно створено');
            }
        } catch (error) {
            console.error(error);
            setShowErrorModal(true);
            setErrorMessage(error.message);
        }
    }

    const handleCloseErrorModal = () => setShowErrorModal(false);

    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setMiddleName('');
        setPhone('');
        setEmail('');
        setStartWork('');
        setSalary('');
        setUserId('');
        setOfficeId('');
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            input.value = '';
        });
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);
        document.getElementById('startWork').value = currentDate.toISOString().substr(0, 10);
    }

    return (
        <div className={"createEmployeeContainer"}>
            <h1>Створити працівника</h1>
            <div className="nameInfo">
                <InputComponent
                    className={"nameInput"}
                    id={"firstName"}
                    label={"Ім'я"}
                    type={"text"}
                    name={"firstName"}
                    required={true}
                    placeholder={"Введіть ім'я..."}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <InputComponent
                    className={"nameInput"}
                    id={"lastName"}
                    label={"Прізвище"}
                    type={"text"}
                    name={"lastName"}
                    required={true}
                    placeholder={"Введіть прізвище..."}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <InputComponent
                    className={"nameInput"}
                    id={"middleName"}
                    label={"По батькові"}
                    type={"text"}
                    name={"middleName"}
                    placeholder={"Введіть по батькові..."}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
            </div>
            <div className="nameInfo">
                <InputComponent
                    className={"nameInput"}
                    id={"phone"}
                    label={"Телефон"}
                    type={"text"}
                    name={"phone"}
                    required={true}
                    placeholder={"Введіть телефон..."}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <InputComponent
                    className={"nameInput"}
                    id={"email"}
                    label={"Email"}
                    type={"text"}
                    name={"email"}
                    required={true}
                    placeholder={"Введіть електронну пошту..."}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="nameInfo">

                <InputComponent
                    className={"nameInput"}
                    id={"startWork"}
                    label={"Дата початку роботи"}
                    type={"date"}
                    name={"startWork"}
                    required={true}
                    onChange={(e) => setStartWork(e.target.value)}
                />
                <InputComponent
                    className={"nameInput"}
                    id={"salary"}
                    label={"Зарплата"}
                    type={"number"}
                    name={"salary"}
                    required={true}
                    placeholder={"Введіть зарплату..."}
                    onChange={(e) => setSalary(e.target.value)}
                />
                <ComboboxComponent
                    options={offices}
                    onSelect={(id) => setOfficeId(id)}
                    label={"Відділення"}
                />
            </div>
            <div className="createEmployeeButtonArea">
                <button onClick={handleSubmit} className={"btn btn-primary createEmployeeButton"}>Зберегти</button>
                <button onClick={handleClear} className={"btn btn-danger createEmployeeButton"}>Очистити</button>
            </div>
            <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Помилка</Modal.Title>
                </Modal.Header>
                <Modal.Body>Помилка при створенні працівника</Modal.Body>
                {errorMessage && <Modal.Body style={{color: 'red'}}>{errorMessage}</Modal.Body>}
                <Modal.Footer>
                    <button onClick={handleCloseErrorModal} className={"btn btn-danger"}>Закрити</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateEmployeePage;