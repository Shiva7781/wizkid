import "./LoginSignup.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../Context/AuthContextProvider";

const Login = () => {
  let { login } = AuthState();

  const Email = useRef();
  const Password = useRef();
  const [userData, setUserData] = useState({});

  const submitData = (e) => {
    e.preventDefault();

    const email = Email.current.value;
    const password = Password.current.value;

    setUserData({ email, password });
  };

  const handleLogin = () => {
    console.log("userData:", userData);
    login(userData);
  };

  return (
    <div className="login_page">
      <form className="form" onSubmit={submitData}>
        <h3>Login</h3>
        <div>
          <label>
            <input
              type="email"
              placeholder="email"
              ref={Email}
              onChange={submitData}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              placeholder="password"
              ref={Password}
              onChange={submitData}
            />
          </label>
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>
            SUBMIT
          </button>
        </div>
      </form>
      <div>
        <Link className="message" to="/signup">
          Create a new account? Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
