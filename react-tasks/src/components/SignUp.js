// src/components/SignUp.js

import { useState } from "react";
import { Link } from "react-router-dom";

import ValidationSummary from "./ValidationSummary";

function SignUp() {
    const [errors, setErrors] = useState([]);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (evt) => {
        const nextCredentials = { ...credentials };
        nextCredentials[evt.target.name] = evt.target.value;
        setCredentials(nextCredentials);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors([]);
        if (!validateForm()) {
            setErrors(["Passwords do not match!"]);
            return;
        }
        register(credentials);
    };

    function register(credentials) {
        fetch(`http://localhost:8080/create_account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => {
                if (res.ok) {
                    setSuccess(true);
                } else if (res.status === 400) {
                    return res.json()
                } else {
                    return Promise.reject(
                        new Error(`Unexpected status code: ${res.status}`)
                    );
                }
            })
            .then(body => {
                setErrors(body)
            })
            .catch(console.error);
    }

    const validateForm = () => {
        return credentials.password === credentials.confirmPassword;
    };

    return (
        <div className="container my-4">
            <ValidationSummary errors={errors} />
            {success ? (
                <div className="alert alert-success">
                    Congratulations {credentials.username}, you have been registered.
                    Login <Link to="/login">here</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group my-2">
                            <label htmlFor="label" className="mb-1">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                autocomplete="new-username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="label" className="mb-1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                autocomplete="new-password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="label" className="mb-1">Confirm password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Link to="/" className="btn btn-secondary my-2 mx-2">
                                Cancel
                            </Link>
                            <button type="submit" className="btn btn-primary my-2 mx-2">
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default SignUp;