import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Singlefood = () => {
  const { id } = useParams();

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

  // const { _id, name, image, ingredients, recipe, description } = v;
  return (
    <div className="SingleFood">
      <div>
        <h3>{food.name}</h3>
        <img src={food.image} alt="" />
      </div>
      <div>
        <div>
          Ingredients
          {food.ingredients?.map((v, i) => (
            <p>
              Sr {i + 1}. {v}
            </p>
          ))}
        </div>

        <hr />
        <div>
          {food.recipe?.map((v, i) => (
            <p>
              Sr {i + 1}. {v}
            </p>
          ))}
        </div>
        <hr />
        <div>
          {food.recipe?.map((v, i) => (
            <p>
              Step {i + 1}. {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Singlefood;
