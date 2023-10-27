// src/components/NotAuthorized.js

import { Link } from "react-router-dom";

export default function NotAuthorized() {
    return (
        <main>
            <h1>401 - Unauthorized</h1>
            <h4>Please <Link to="/login">log in</Link> or <Link to="/signup">create an account</Link> in order to access these features.</h4>
            
            {/* <img width={'50%'} src="https://http.dog/401.jpg" className="img-fluid" alt="401 - Unauthorized"></img> */}
        </main>
    );
}