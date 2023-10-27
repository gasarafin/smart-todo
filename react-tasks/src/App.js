import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";

import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import ModifyAccount from "./components/ModifyAccount";
import NotFound from "./components/NotFound";
import NotImplemented from "./components/NotImplemented";
import NotAllowed from "./components/NotAllowed";
import SignUp from "./components/SignUp";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import AuthContext from "./contexts/AuthContext";
import { refreshToken, logout } from './services/AuthAPI';

const TIMEOUT_MILLISECONDS = 14 * 60 * 1000;

function App() {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const resetUser = useCallback(() => {
    refreshToken()
      .then((user) => {
        setUser(user);
        setTimeout(resetUser, TIMEOUT_MILLISECONDS);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialized(true));
  }, []);

  useEffect(() => {
    resetUser();
  }, [resetUser]);


  const auth = {
    user: user,
    handleLoggedIn(user) {
      setUser(user);
      setTimeout(resetUser, TIMEOUT_MILLISECONDS);

console.log(user)

    },
    hasAuthority(authority) {
      return user?.authorities.includes(authority);
    },
    logout() {
      logout();
      setUser(null);
    },
  };

  if (!initialized) {
    return null;
  }

  console.log("in app.js")
console.log(auth)


  const renderWithAuthority = (Component, ...authorities) => {
    for (let authority of authorities) {
      if (auth.hasAuthority(authority)) {
        return <Component />;
      }
    }
    return <NotAllowed />;
  };


  return (
    <main className="container">
      <AuthContext.Provider value={auth}>
        <Router>
          <Header />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ModifyAccount />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/501" element={<NotImplemented />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addtask" element={<TaskForm />} />
            <Route path="/updatetask/:taskID" element={<TaskForm />} />
  {/*         <Route path="/viewtasks" element={renderWithAuthority(TaskList, "ADMIN")} />   */}
            <Route path="/viewtasks" element={<TaskList />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </main>
  );
}

export default App;
