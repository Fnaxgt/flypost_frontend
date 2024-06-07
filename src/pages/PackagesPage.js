import React, {useEffect, useState} from 'react';
import InputComponent from "../components/InputComponent";
import ComboboxComponent from "../components/ComboboxComponent";
import axios from "axios";
import PackageComponent from "../components/PackageComponent";

import './PackagesPage.css';
import {NavLink} from "react-router-dom";

const PackagesPage = () => {
    const [packages, setPackages] = useState([]);
    const [cities, setCities] = useState([]);
    const [offices, setOffices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:3001/packages')
            .then((response) => {
                setPackages(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [selectedCity, selectedOffice]);

    useEffect(() => {
        axios.get('https://localhost:3001/cities')
            .then((response) => {
                setCities(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

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
    return (
        <div className={"packagesContainer"}>
            <h1>Список активних посилок</h1>
            <div className="managerContainer">
                <div>
                    <NavLink to={'/createPackage'} className="btn btn-primary">Створити відправлення +</NavLink>
                </div>
                <ComboboxComponent
                    options={cities}
                    onSelect={(id) => console.log(id)}
                    label={"Місто"}
                />
                <ComboboxComponent
                    options={offices}
                    onSelect={(id) => console.log(id)}
                    label={"Відділення"}
                />
            </div>
            <div className="packagesList">
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
                <PackageComponent
                    id={200004008}
                    sender={"Шумейко Антон Олександрович"}
                    receiver={"Галкін Микола Сергійович"}
                    receiverAddress={"м. Київ, вул. Шевченка, 1"}
                    currentAddress={"м. Київ, вул. Шевченка, 1"}
                    paymentId={null}
                />
                {packages && packages.map((packageItem) => (
                    <PackageComponent
                        id={packageItem.id}
                        sender={packageItem.sender}
                        receiver={packageItem.receiver}
                        receiverAddress={packageItem.receiverAddress}
                        currentAddress={packageItem.currentAddress}
                        paymentId={packageItem.paymentId}
                    />
                ))}
            </div>
        </div>
    );
};

export default PackagesPage;