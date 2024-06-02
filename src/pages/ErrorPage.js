import React from 'react';

const ErrorPage = () => {
    return (
        <div>
            <h1>Error 404</h1>
            <h2>Нажаль сторінку на знайдено</h2>
            <button className={"btn btn-primary"}>
                <a href={"/"}>На головну</a>
            </button>
        </div>
    );
};

export default ErrorPage;