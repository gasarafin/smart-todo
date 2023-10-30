// src/components/Login.js

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/AuthAPI";
import AuthContext from "../contexts/AuthContext";
import ValidationSummary from "./ValidationSummary";

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);

    const { handleLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setErrors([]);
        login(credentials)
            .then(user => {
                handleLoggedIn(user);
                navigate("/");
            })
            .catch(err => {
                setErrors(['Invalid username/password.']);
            });
    };

    const handleChange = (evt) => {
        const nextCredentials = { ...credentials };
        nextCredentials[evt.target.name] = evt.target.value;
        setCredentials(nextCredentials);
    };

    return (
        <div className="container my-4">
            <ValidationSummary errors={errors} />
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-group my-2">
                        <label htmlFor="label" className="mb-1">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
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
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Link to="/" className="btn btn-secondary my-2 mx-2">
                            Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary my-2 mx-2">
                            Log in
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;