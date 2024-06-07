import React, {useEffect} from 'react';

import './PackageComponent.css';
//fontawesome truck and credit cart import
import { faTruck, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PackageComponent = (props) => {
    const { id, sender, receiver, receiverAddress, currentAddress, paymentId } = props;
    const isDeliverable = receiverAddress === currentAddress;
    const [visible, setVisible] = React.useState("");
    useEffect(() => {
        const str = id.toString();
        setVisible(str.slice(0, 2) + " " + str.slice(2, 5) + " " + str.slice(5));
    }, [id]);

    const navigate = useNavigate();

    const handlePayPackage = () => {
        navigate(`/payment/?packageId=${id}`);
    }

    const handleDeletePackage = () => {
        axios.delete(`http://localhost:3001/packages/${id}`)
            .then(() => {
                console.log("Package deleted");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div key={props.id} className="packageItem">
            <h1 className="packageNumber">
                {visible}
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
                <FontAwesomeIcon icon={faTruck} size="2x"
                                 color={isDeliverable ? "green" : "grey"}
                />
                <FontAwesomeIcon icon={faCreditCard} size="2x"
                                 color={paymentId ? "green" : "grey"}
                />
            </div>
            <div className="packageItemActions">
                <div id={"payPackageButton"} className={!paymentId ? "btn btn-primary" : "btn btn-primary disabled"} onClick={handlePayPackage}>Оплата</div>
                <div id={"deletePackageButton"} className={isDeliverable ? "btn btn-danger" : "btn btn-danger disabled"} onClick={handleDeletePackage}>Видати</div>
            </div>
        </div>
    );
};

export default PackageComponent;