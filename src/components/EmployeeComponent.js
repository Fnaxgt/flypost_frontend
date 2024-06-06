import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";

const EmployeeComponent = (props) => {
    const {employee} = props;

    const deleteEmployee = () => {
        const id = employee.id;
        axios.delete(`http://localhost:3001/employees/${id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <tr key={employee.id}>
            <td>{employee.last_name + " " + employee.first_name + " " + employee.middle_name}</td>
            <td>{employee.login}</td>
            <td>{employee.office_id}</td>
            <td>{employee.start_work}</td>
            <td>
                <NavLink to={`/createEmployee/?employeeId=${employee.id}`} className="btn btn-primary">Редагувати</NavLink>
            </td>
            <td>
                <button onClick={deleteEmployee} className="btn btn-danger">Видалити</button>
            </td>
        </tr>
    );
};

export default EmployeeComponent;