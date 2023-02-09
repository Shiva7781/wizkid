import "./LoginSignup.css";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const Name = useRef();
  const Email = useRef();
  const Password = useRef();
  const [userData, setUserData] = useState({});

  const submitData = (e) => {
    e.preventDefault();

    const name = Name.current.value;
    const email = Email.current.value;
    const password = Password.current.value;

    setUserData({ name, email, password });
  };

  const handleSignup = async () => {
    console.log("userData:", userData);

    try {
      const { data } = await axios.post(
        `https://wizkid.onrender.com/api/user/register`,
        userData
      );

      console.log("data:", data);
      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      console.log("err:", err.response?.data || err.message);
      alert(err.response?.data || err.message);
    }
  };

  return (
    <div className="signup_page">
      <form className="form" onSubmit={submitData}>
        <h3>Signup</h3>
        <div>
          <label>
            <input
              type="text"
              placeholder="Enter name"
              ref={Name}
              onChange={submitData}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="email"
              placeholder="Enter email"
              ref={Email}
              onChange={submitData}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              placeholder="Enter password"
              ref={Password}
              onChange={submitData}
            />
          </label>
        </div>
        <div>
          <button onClick={() => handleSignup()}>SUBMIT</button>
        </div>
      </form>
      <div>
        <Link className="message" to="/">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
