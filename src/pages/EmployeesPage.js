import React, {useEffect, useState} from 'react';

import './EmployeesPage.css';
import {NavLink} from "react-router-dom";
import axios from "axios";
import EmployeeComponent from "../components/EmployeeComponent";

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/employees')
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

    }, []);

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={"employeesContainer"}>
            <h1>Список співробітників</h1>
            <div className="managerContainer">
                <div>
                    <NavLink to={'/createEmployee'} className="btn btn-primary">Додати працівника +</NavLink>
                </div>
            </div>
            <div className="loaderContainer">
                {loading && <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>}
            </div>
            <div className="errorContainer">
                {error && <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>}
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ПІБ</th>
                    <th scope="col">Логін</th>
                    <th scope="col">Номер відділення</th>
                    <th scope="col">Дата найму</th>
                    <th scope="col"> </th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => {
                    return <EmployeeComponent key={employee.id} employee={employee} deleteEmployee={deleteEmployee}/>
                })}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesPage;