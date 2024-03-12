import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [credential, setCredential] = useState({ username: "", email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API Call
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: credential.username, email: credential.email, password: credential.password})
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
        }
        else {
            alert("Invalid credentials")
        }

    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div className='container'>
            <h2>Signup to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Userame</label>
                    <input type="text" className="form-control" id="name" name='username' value={credential.name} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
