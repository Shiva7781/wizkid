import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthState } from "./Context/AuthContextProvider";

const Food = () => {
  let { logout } = AuthState();
  const [foodData, setFoodData] = useState();

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const { data } = await axios.get(`https://wizkid.onrender.com/api/food`);

      console.log("data:", data);
      setFoodData(data);
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Food;
