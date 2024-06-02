import React, {useState} from 'react';

import './AuthPage.css';
import InputComponent from "../components/InputComponent";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleButton from "../components/GoogleButton";

const AuthPage = () => {
    const [valid, setValid] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        if(false){
            setValid(true);
        }
        else{
            setValid(false);
        }
    }

    return (
        <div className={"authPage"}>
            <div className="authContainer">
                <aside className="authAside">
                    <h2>Авторизація</h2>
                    <GoogleButton>
                    </GoogleButton>
                </aside>
                <div className="authForm">
                    <form onSubmit={handleSubmit}>
                        <InputComponent
                            className={"authInput"}
                            id={"login"}
                            label={"Введіть логін чи електронну пошту"}
                            type={"text"}
                            name={"userLogin"}
                            required={true}
                            placeholder={"Введіть логін..."}
                            error={"Неправильний логін або пароль"}
                            valid={valid}
                        ></InputComponent>
                        <InputComponent
                            className={"authInput"}
                            id={"password"}
                            label={"Введіть пароль"}
                            type={"password"}
                            name={"userPassword"}
                            required={true}
                            placeholder={"Введіть пароль..."}
                            error={"Неправильний логін або пароль"}
                            valid={valid}
                        ></InputComponent>
                        <button type="submit" className={"btn btn-primary"}>Увійти</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;