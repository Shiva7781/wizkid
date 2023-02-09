import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthState } from "./Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();
  let { logout } = AuthState();
  const [foodData, setFoodData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const foodDetail = (v) => {
    // console.log("v:", v);

    navigate(`/food/${v._id}`);
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search name or ingredients"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="FoodData">
        {foodData
          ?.filter((val) => {
            return val.name.toLowerCase().includes(searchTerm.toLowerCase());
          })
          .map((v) => {
            const { _id, name, image } = v;

            return (
              <div key={_id} onClick={() => foodDetail(v)}>
                <img src={image} alt="" />
                <h3>{name}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Food;
