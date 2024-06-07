import React from 'react';
import {NavLink} from "react-router-dom";

const EmployeeComponent = (props) => {
    const {employee, deleteEmployee} = props;
    const date = new Date(employee.start_work);
    const formattedDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    return (
        <tr key={employee.id}>
            <td>{employee.last_name + " " + employee.first_name + " " + employee.middle_name}</td>
            <td>{employee.login}</td>
            <td>{employee.office_id}</td>
            <td>{formattedDate}</td>
            <td>
                <NavLink to={`/createEmployee/?employeeId=${employee.id}`} className="btn btn-primary">Редагувати</NavLink>
            </td>
            <td>
                <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Видалити</button>
            </td>
        </tr>
    );
};

export default EmployeeComponent;