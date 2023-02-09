import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthState } from "./Context/AuthContextProvider";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let { user } = AuthState();

  const [editedFood, setEditedFood] = useState();

  useEffect(() => {
    fetchFood();

    // eslint-disable-next-line
  }, []);

  // ----------------- Getting the single food which will be automatically filled in the inputs ----------------------------

  const fetchFood = async () => {
    const { data } = await axios.get(
      `https://wizkid.onrender.com/api/food/${id}`
    );
    console.log("data:", data);
    setEditedFood(data);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "recipe" || name === "ingredients") { 
      value = value.split("|");
    }

    console.log("value:", value);
    setEditedFood({ ...editedFood, [name]: value });
  };

  const submitData = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      };
      
      // ------------------- updating the data ---------------------
      
      let { data } = await axios.patch(
        `https://wizkid.onrender.com/api/food/update/${id}`,
        editedFood,
        config
      );

      console.log("data:", data);
      alert(data);

      navigate(-1);
    } catch (err) {
      console.log("err:", err);
      alert(err.response?.data.message || err.message);
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
            value={editedFood?.name}
            onChange={handleEdit}
          />
          <br />
          <br />
          <label>Food Image</label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={editedFood?.image}
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
            value={editedFood?.ingredients?.join("|")}
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
            value={editedFood?.recipe?.join("|")}
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
            value={editedFood?.description}
            onChange={handleEdit}
          />
          <br />
          <button onClick={submitData} className="submit_btn">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default EditFood;
