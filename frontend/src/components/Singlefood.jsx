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
      navigate(`/edit/${food._id}`);
    } else {
      alert("You are not allowed to do this");
    }
  };

  return (
    <div className="SingleFood">
      <div className="SingleFoodLeft">
        <h3>{food.name}</h3>
        <img src={food.image} alt="" />
      </div>

      <div className="SingleFoodRight">
        <button onClick={handleNavigate}>Edit</button>
        <div>
          {/* <p>{food.ingredients}</p> */}
          <b> Ingredients:</b>
          {food.ingredients?.map((v, i) => (
            <p key={i}>
              {i + 1}. {v}
            </p>
          ))}
        </div>

        <hr />
        <div>
          <b> Recipe:</b>
          {food.recipe?.map((v, i) => (
            <p key={i}>
              Step {i + 1}. {v}
            </p>
          ))}
        </div>

        <hr />
        <div>
          <b> Description:</b>
          <p>{food.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
