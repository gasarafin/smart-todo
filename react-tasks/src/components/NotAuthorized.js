// src/components/NotAuthorized.js

//TODO Needs stylizing badly

import { Link } from "react-router-dom";

function NotAuthorized() {
    return (
        <main>
            <h1>401 - Unauthorized</h1>
            <h4>Please <Link to="/login">log in</Link> or <Link to="/signup">create an account</Link> in order to access these features.</h4>
        </main>
    );
};

export default NotAuthorized;