// src/components/Home.js

function Home() {
    return (
        <div className="container-fluid" >
            <img alt="Home Screen" src={process.env.PUBLIC_URL + "/smarttasker.svg"} width={'50%'} className="d-block align-top"/>
            <div className="my-4">
                <main>
                    <p>The floof will spill the tea for you - this page hasn't been made yet.</p>
                    <img width={'50%'} src="https://http.dog/418.jpg" className="img-fluid" alt="Not Implemented Yet - Here's a Dog Instead"></img>
                </main>
            </div>
        </div>
    );
}

export default Home;