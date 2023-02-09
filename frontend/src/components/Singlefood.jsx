import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthState } from "./Context/AuthContextProvider";

const SingleFood = () => {
  let { user } = AuthState();
  // console.log("user:", user);

  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState([]);

  useEffect(() => {
    fetchSignleFood();

    // eslint-disable-next-line
  }, []);

  // ----------------- Getting the single food which user clicked on home page ----------------------------
  const fetchSignleFood = async () => {
    const { data } = await axios.get(
      `https://wizkid.onrender.com/api/food/${id}`
    );
    console.log("data:", data);
    setFood(data);
  };

  const handleNavigate = () => {
    // console.log(user._id, food.userID);

    if (user._id === food.userID) {
      // checking if food is created by the user or not
      navigate(`/edit/${food._id}`); // navigating user to the edit page,
    } else {
      alert("You are not allowed to do this");
    }
  };

  return (
    <div className="SingleFood">
      <div className="SingleFoodLeft">
        <h1 className="food_title">{food.name}</h1>
        <img src={food.image} alt="" />
      </div>

      <div className="SingleFoodRight">
        <button onClick={handleNavigate} className="edit_button">
          Edit
        </button>
        <div>
          <h2 className="titles"> Ingredients:</h2>
          {food.ingredients?.map((v, i) => (
            <p key={i}>
              {i + 1}. {v}
            </p>
          ))}
        </div>

        <hr />
        <div>
          <h2 className="titles"> Recipe:</h2>
          {food.recipe?.map((v, i) => (
            <p key={i}>
              Step {i + 1}. {v}
            </p>
          ))}
        </div>

        <hr />
        <div>
          <h2 className="titles"> Description:</h2>
          <p>{food.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
