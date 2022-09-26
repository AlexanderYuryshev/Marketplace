import { React, useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export const SignupPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError } = useHttp();
    const [form, setForm] = useState({
        name: "",
        password: "",
        deliveryAddress: "",
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            await request(`${auth.url}signup`, "POST", { ...form });
        } catch (e) {}
    };

    return (
        <div className="column-container">
            <h2 className="app-header">Sign Up</h2>
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
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <input
                className="auth-input"
                placeholder="Enter your address for delivery"
                id="deliveryAddress"
                type="text"
                name="deliveryAddress"
                onChange={changeHandler}
            ></input>
            <button onClick={registerHandler} disabled={loading}>
                Sign Up
            </button>
            <NavLink to="/login">
                <span>Already have an account?</span>
            </NavLink>
        </div>
    );
};
