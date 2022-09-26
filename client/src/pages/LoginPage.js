import { React, useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export const LoginPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        name: "",
        password: "",
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const loginHandler = async () => {
        try {
            const data = await request(`${auth.url}login`, "POST", { ...form });
            auth.login(data.userId, data.token);
        } catch (e) {}
    };

    return (
        <div className="column-container">
            <h2 className="app-header">Log In</h2>
            <label htmlFor="text">Name</label>
            <input
                className="auth-input"
                placeholder="Enter your name"
                id="name"
                type="text"
                name="name"
                onChange={changeHandler}
            ></input>
            <label htmlFor="password">Password</label>
            <input
                className="auth-input"
                placeholder="Enter your password"
                id="password"
                type="password"
                name="password"
                onChange={changeHandler}
            ></input>
            <button onClick={loginHandler} disabled={loading}>
                Log in
            </button>
            <NavLink to="/signup">
                <span>Do not have an account yet?</span>
            </NavLink>
        </div>
    );
};
