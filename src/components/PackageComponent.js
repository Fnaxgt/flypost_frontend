import React from 'react';

import './PackageComponent.css';
//fontawesome truck and credit cart import
import { faTruck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PackageComponent = (props) => {
    return (
        <div key={props.id} className="packageItem">
            <h1 className="packageNumber">
                {props.id}
            </h1>
            <div className="verPackageLine"></div>
            <div className="usersContainer">
                <div className="packageUser">
                    <p>Відправник</p>
                    <h4>{props.sender}</h4>
                </div>
                <div className="packageUser">
                    <p>Отримувач</p>
                    <h4>{props.receiver}</h4>
                </div>
            </div>
            <div className="statusContainer">
                <FontAwesomeIcon icon={faTruck} size="2x" color="green" />
                <FontAwesomeIcon icon={faCreditCard} size="2x" color="green" />
            </div>
            <div className="packageItemActions">
                <div id={"payPackageButton"} className="btn btn-primary">Оплата</div>
                <div id={"deletePackageButton"} className="btn btn-primary">Видалити</div>
            </div>
        </div>
    );
};

export default PackageComponent;