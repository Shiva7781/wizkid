import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthState } from "./Context/AuthContextProvider";

const AddFood = () => {
  const navigate = useNavigate();
  let { user } = AuthState();

  const [newFood, setNewFood] = useState({
    name: "",
    image: "",
    ingredients: [],
    recipe: [],
    description: "",
  });

  const handleEdit = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "recipe" || name === "ingredients") {
      value = value.split("|");
    }

    console.log("value:", value);
    setNewFood({ ...newFood, [name]: value });
  };

  const submitData = async () => {
    const { name, image, ingredients, recipe, description } = newFood;
    console.log("newFood:", newFood);

    if (
      !name ||
      !image ||
      !ingredients.length ||
      !recipe.length ||
      !description
    ) {
      return alert("All field Required");
    }

    try {
      const config = {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      };

      let { data } = await axios.post(
        `https://wizkid.onrender.com/api/food/add`,
        newFood,
        config
      );

      console.log("data", data);

      navigate(-1);
    } catch (err) {
      // console.log("err:", err);
      alert(err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="EditFood">
        <form onSubmit={handleEdit}>
          <br />
          <label>Food Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={newFood.name}
            onChange={handleEdit}
          />
          <br />
          <br />
          <label>Food Image</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={newFood.image}
            onChange={handleEdit}
          />
          <br />
          <br />
          <label>Ingredients</label>
          <br />
          <input
            type="text"
            name="ingredients"
            placeholder="Enter ingredients"
            value={newFood.ingredients?.join("|")}
            onChange={handleEdit}
          />
          <br />
          <br />
          <label> Recipe</label>
          <br />
          <input
            type="text"
            name="recipe"
            placeholder="Enter recipe"
            value={newFood.recipe?.join("|")}
            onChange={handleEdit}
          />
          <br />
          <br />
          <label> Description</label>
          <br />
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={newFood.description}
            onChange={handleEdit}
          />
          <br />
          <button onClick={submitData} className="submit_btn">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFood;
