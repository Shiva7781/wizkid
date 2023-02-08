import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let LS = JSON.parse(localStorage.getItem("userInfo"));
  //   console.log("LS:", LS);
  const [user, setUser] = useState(LS);

  const login = async (payload) => {
    try {
      const { data } = await axios.post(
        `https://wizkid.onrender.com/api/user/login`,
        payload
      );
      localStorage.setItem("userInfo", JSON.stringify(data));

      setUser(data);
      alert("Login successful");
    } catch (err) {
      console.log("err:", err.response?.data || err.message);
      alert(err.response?.data || err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");

    setUser(null);
    alert("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const AuthState = () => {
  return useContext(AuthContext);
};
