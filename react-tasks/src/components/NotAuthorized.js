// src/components/NotAuthorized.js

import { Link } from "react-router-dom";

function NotAuthorized() {
    return (
        <div className="container mt-3 py-3">
            <main role="main" className="inner cover text-center">
                <h1 className="cover-heading">401 - Unauthorized</h1>
                <h4 className="lead">Please <Link to="/login">log in</Link> or <Link to="/signup">create an account</Link> in order to access these features.</h4>
            </main>
        </div>
    );
};

export default NotAuthorized;