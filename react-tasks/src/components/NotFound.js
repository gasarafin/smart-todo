// src/components/NotFound.js

export default function NotFound() {
    return (
        <main>
            <img width={'50%'} src="https://http.dog/404.jpg" className="img-fluid" alt="404-Not Found"></img>
            {/*<img src={process.env.PUBLIC_URL + '/images/404.jpg'} className="img-fluid" alt="404-Not Found"></img>*/}
        </main>
    );
}