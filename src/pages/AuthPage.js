import React, {useEffect, useState} from 'react';

import './AuthPage.css';
import InputComponent from "../components/InputComponent";

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleButton from "../components/GoogleButton";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const AuthPage = () => {
    const [valid, setValid] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const signIn = useSignIn();

    useEffect(() => {
        setValid(true);
    }, [login, password]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { login, password });
            if (response.status === 200 && response.data.token) {
                const isSignInSuccess = signIn({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { username: response.data.username, role: response.data.role }
                });
                if (isSignInSuccess) {
                    console.log("User signed in successfully");
                } else {
                    console.log("Sign in failed");
                }
            } else {
                setValid(false);
            }
        } catch (error) {
            setValid(false);
            console.error("Error during authentication:", error);
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
                            onChange={(e) => setLogin(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        ></InputComponent>
                        <button type="submit" className={"btn btn-primary"}>Увійти</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;