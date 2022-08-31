import {React, useEffect, useState, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        name: '',
        password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            await request(`${auth.url}signup`, 'POST', {...form});
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request(`${auth.url}login`, 'POST', {...form});
            auth.login(data.userId);
        } catch (e) {}
    }

    return (
        <div>
            <div className='input-field'>
                <input 
                placeholder='Enter your name' 
                id='name' 
                type='text' 
                name='name'
                onChange={changeHandler}></input>
                <label htmlFor='text'>Name</label>
            </div>
            <div className='input-field'>
                <input 
                placeholder='Enter your password' 
                id='password' 
                type='password' 
                name='password' 
                onChange={changeHandler}></input>
                <label htmlFor='password'>Password</label>
            </div>
            <div className='card-action'>
                <button className="btn" onClick={loginHandler} disabled={loading}>Log in</button>
                <button className="btn" onClick={registerHandler} disabled={loading}>Register</button>
            </div>
        </div>
    )
}