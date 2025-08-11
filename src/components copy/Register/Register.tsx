import React, { useState } from 'react';
import styles from './Register.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserRegister {
    id: string;
    name: string;
    gender: string;
    email: string;
    contact: string;
    password: string;
    confirmpassword: string;
    province: string;
    streetaddress: string;
    city: string;
    postalcode: string;
}

export const Register: React.FC = () => {

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [gender, setGender] =useState<string>('male');
    const [email, setEmail] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [province, setProvince] = useState<string>('');
    const [streetAddress, setStreetAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');

    const navigate = useNavigate();

    const isValidate = (): boolean => {
            let isValid = true;
            let errorMeesage = 'Please enter valid input:';

            if(!id){
                isValid = false;
                errorMeesage += ' Username ';
            }

            if(!name){
                isValid = false;
                errorMeesage += ' Full Name ';
            }

            if(!email){
                isValid = false;
                errorMeesage += ' Email ';
            }

            if(!password){
                isValid = false;
                errorMeesage += ' Password ';
            }

            if(!confirmPassword){
                isValid = false;
                errorMeesage += ' Confirm Password ';
            }

            if(!isValid){
            toast.warning(errorMeesage);
            }
            else{
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}+$/
                    if(emailRegex.test(email)){
                        toast.warning('Please enter valid email');
                        isValid = false;
                    }
                }
                return isValid
        };

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(!isValidate()) return;
            
        const userRegister: UserRegister = {
            id, 
            name, 
            gender, 
            email, 
            contact, 
            password, 
            confirmPassword, 
            province, 
            streetAddress, 
            city, 
            postalCode, 
        };
            
        
        fetch("http://localhost:3000/user",{
            method: "POST",
            headers:{ 'content-type': 'application/json' },
            body: JSON.stringify(userRegister)
        })
        .then((res) => {
            toast.success('Registered successfully.')
            navigate('/Login');
        })
        .catch((err) => {
            toast.error('Failed: ' +err.message);
        });
    };
            

    return(
        <div className="offset-lg-3 collg-6">
            <form  className="form-container" onSubmit={handlesubmit}>
                <div className="card-header">
                    <h2>User Registration</h2>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>
                                    User name: <span className="errormsg">*</span>
                                </label>
                                <input 
                                    value={id} 
                                    onChange={(e)=>setId(e.target.value)} 
                                    className="form-control" 
                                    type="text" 
                                    placeholder='User name' 
                                />
                            </div>
                        </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Full name: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={name} 
                                        onChange={(e)=>setName(e.target.value)} 
                                        className="form-control" 
                                        type="text" 
                                        placeholder='First Name' 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Gender:</label>
                                    <br /><br />
                                    <input 
                                        checked={gender==='male'} 
                                        onChange={()=> setGender('male')}
                                        type="radio" 
                                        name="gender" 
                                        value="male" 
                                        className="app-check" 
                                    />
                                    <label className="me-3 ms-1">Male</label>
                                    <input 
                                        checked={gender==='female'} 
                                        onChange={()=> setGender('female')}
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        className="app-check" 
                                    />
                                    <label className="ms-1">female</label>

                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Email: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={email} 
                                        onChange={(e)=>setEmail(e.target.value)} 
                                        className="form-control"
                                        type="text" 
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Contact Number: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={contact} 
                                        onChange={(e)=>setContact(e.target.value)} 
                                        className="form-control"
                                        type="text"  
                                        placeholder="Contact number" 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label >Password: <span className="errormsg">*</span></label>
                                    <input 
                                        value={password} 
                                        onChange={(e)=>setPassword(e.target.value)} 
                                        className="form-control" 
                                        type="password"  
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Confirm Password: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={confirmPassword} 
                                        onChange={(e)=>setConfirmPassword(e.target.value)} 
                                        className="form-control" 
                                        type="Password"  
                                        placeholder="Confirm Password" 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Province: <span className="errormsg">*</span>
                                    </label>
                                    <select 
                                        value={province} 
                                        onChange={(e)=>setProvince(e.target.value)} 
                                        className="form-control"
                                    >
                                        <option value=""> ---Select Province-- </option>
                                        <option value="Eastern Cape">Eastern Cape</option>
                                        <option value="Free State">Free State</option>
                                        <option value="Gauteng">Gauteng</option>
                                        <option value="Kwa-Zulu Natal">Kwa-Zulu Natal</option>
                                        <option value="Limpopo">Limpopo</option>
                                        <option value="Mpumalanga">Mpumalanga</option>
                                        <option value="Northen Cape">Northen Cape</option>
                                        <option value="North West">North West</option>
                                        <option value="Western Cape">Western Cape</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        Street Address: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={streetAddress} 
                                        onChange={(e)=>setStreetAddress(e.target.value)} 
                                        className="form-control"
                                        type="text"  
                                        placeholder="Street Address" 
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>
                                        City: <span className="errormsg">*</span>
                                    </label>
                                    <input 
                                        value={city} 
                                        onChange={(e)=>setCity(e.target.value)} 
                                        className="form-control"
                                        type="text"  
                                        placeholder="City" 
                                        />
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group">
                                <label>
                                    Postal Code: <span className="errormsg">*</span>
                                </label>
                                <input 
                                    value={postalCode} 
                                    onChange={(e)=>setPostalCode(e.target.value)} 
                                    className="form-control" 
                                    type="text"  
                                    placeholder='First Name' 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions mt-3">
                    <input className="btn btn-primary" type="submit" value="Register" />
                    <NavLink style={{marginLeft: '5px'}} to="/Login" className="btn btn-danger">Back</NavLink>
                </div>  
            </form>
        </div>
    )
}