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

    // eslint-disable-next-line
  }, [searchTerm]);

  const fetchFood = async () => {
    try {
      const { data } = await axios.get(
        `https://wizkid.onrender.com/api/food?name=${searchTerm}&ingredients=${searchTerm}`
      );

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

  console.log(foodData);
  return (
    <>
      <div className="butn_div">
        <button onClick={() => navigate("/add")} className="add_btn">
          Add Food
        </button>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </div>
      <h1 className="search_heading">
        Search Your Meal By Name or Ingredients
      </h1>
      
      <input
        type="text"
        value={searchTerm}
        placeholder="Search food by name or ingredients"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search_input"
      />

      <div className="FoodData">
        {searchTerm && foodData.length === 0 ? (
          <h3>No Data Available</h3>
        ) : (
          <>
            {searchTerm &&
              foodData.map((v) => {
                const { _id, name, image } = v;

                return (
                  <div key={_id} onClick={() => foodDetail(v)}>
                    <img src={image} alt="" />
                    <h3>{name}</h3>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};

export default Food;
