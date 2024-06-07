import React, {useEffect, useState} from 'react';

import './CreateEmployeePage.css';
import InputComponent from "../components/InputComponent";
import ComboboxComponent from "../components/ComboboxComponent";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import {useLocation, useNavigate} from "react-router-dom";

const CreateEmployeePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [employeeId, setEmployeeId] = useState(new URLSearchParams(location.search).get('employeeId'));

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [startWork, setStartWork] = useState('');
    const [salary, setSalary] = useState('');
    const [officeId, setOfficeId] = useState('');
    const [userId, setUserId] = useState(-1);

    const [offices, setOffices] = useState([]);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/offices')
            .then((response) => {
                setOffices(response.data);
                setOfficeId(response.data[0].id);
            })
            .catch((error) => {
                console.error(error);
            });
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);
        setStartWork(currentDate.toISOString().substr(0, 10));
        if (employeeId) {
            console.log(employeeId)
            axios.get(`http://localhost:3001/employees/${employeeId}`)
                .then((response) => {
                    const row = response.data[0];
                    console.log(row)
                    setFirstName(row.first_name);
                    setLastName(row.last_name);
                    setMiddleName(row.middle_name);
                    setPhone(row.phone);
                    setEmail(row.email);
                    const date = new Date(row.start_work);
                    date.setHours(date.getHours() + 3);
                    setStartWork(date.toISOString().substr(0, 10));
                    setSalary(row.salary);
                    setOfficeId(row.office_id);
                    setUserId(row.user_id);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(startWork);
        if(employeeId){
            axios.put(`http://localhost:3001/employees/${employeeId}`, {
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                phone: phone,
                email: email,
                start_work: startWork,
                salary: salary,
                office_id: officeId,
                user_id: userId
            })
                .then((response) => {
                    console.log(response);
                    navigate('/employees');
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage(error.response.data.message);
                    setShowErrorModal(true);
                });
        }
        else{
            try {
                const response = await axios.post('http://localhost:3001/employees', {
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    phone: phone,
                    email: email,
                    start_work: startWork,
                    salary: salary,
                    user_id : userId,
                    office_id: officeId
                });
                if (response.status === 200) {
                    navigate('/employees');
                }
            } catch (error) {
                console.error(error);
                setShowErrorModal(true);
                setErrorMessage(error.message);
            }
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
                    value={firstName}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <InputComponent
                    className={"nameInput"}
                    id={"middleName"}
                    label={"По батькові"}
                    type={"text"}
                    name={"middleName"}
                    placeholder={"Введіть по батькові..."}
                    value={middleName}
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
                    value={phone}
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
                    value={email}
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
                    value={startWork}
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
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
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
                    onChange={(e) => setOfficeId(e.target.value)}
                    label={"Відділення"}
                    value={officeId}
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