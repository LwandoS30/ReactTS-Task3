import { useState, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { Register } from '../Register/Register';


export const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const toUserProfile = useNavigate();

    const ProceedLogin = async (e: FormEvent<HTMLFormElement>)  => {
        e.preventDefault(); 
        if(validate()){
            try{
                const response = await fetch(`http://localhost:3000/user/${username}`);
                const resp = await response.json();
                if(!resp || Object.keys(resp).length === 0 || resp.password !== password){
                    toast.error('Please enter valid credentials')
                }
                else
                    {
                        toast.success('Logged in successfully');
                        toUserProfile(`/LandingPage/${username}`);
                    }
            }
            catch(err:any)
            {
                toast.error('Login failed due to: '+err.message);
            }
        }
           
    };

    const validate = (): boolean => {
        let result = true;

        if(!username && !password){
            toast.warning(' username or password is not valid');
            result = false;
        }
        return result;
    };
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return(
        <div className='row'>
            <div className='offset-lg-3 col-lg-6' style={{marginTop:'100px'}}>
                <form onSubmit={ProceedLogin} className='container'>
                    <div className="card">
                        <div className='card-header'>
                            <h2>Login</h2>
                        </div>

                        <div className='card-body'>
                            <div className='form-group'>
                                <label>
                                    Username: <span className='errormsg'>*</span>
                                </label>
                                <input 
                                    value={username} 
                                    onChange={ handleUsernameChange } 
                                    type="text" 
                                    className={'form-control'} 
                                />
                            </div>
                            <div className='form-group'>
                                <label>
                                    Password: <span className='errormsg'>*</span>
                                </label>
                                <input 
                                    value={password} 
                                    onChange={ handlePassword } 
                                    type="password" 
                                    className='form-control'
                                />
                            </div>
                        </div>

                        <div className='card-footer'>
                            <input 
                                type="submit" 
                                className="btn btn-primary" 
                                value="Login" 
                                style={{marginRight: '5px'}}
                            />
                            <NavLink to={'/Register'} className="btn btn-success">
                                Register
                            </NavLink>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};