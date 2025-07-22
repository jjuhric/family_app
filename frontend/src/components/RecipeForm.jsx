import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";


const RecipeForm = ({ initialData, onSubmit }) => {
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      author: authUser.fulllName,
      ingredients: "",
      instructions: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      !initialData ? navigate("/recipes") : navigate(`/recipes/${formData._id}`); 
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  if (!formData) {
    return <div>Loading form...</div>;
  }

  return (
    <form className="space-y-4 p-4 bg-base-100 rounded-lg shadow-md">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-base-content"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full input input-bordered"
          required
        />
      </div>
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-base-content"
        >
          Author
        </label>
        <input
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          rows="1"
          className="mt-1 block w-full textarea textarea-bordered"
          required
        ></input>
      </div>
      <div>
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-base-content"
        >
          Ingredients
        </label>
        {
          formData.ingredients.split("\n").map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...formData.ingredients.split("\n")];
                newIngredients[index] = e.target.value;
                setFormData((prevData) => ({
                  ...prevData,
                  ingredients: newIngredients.join("\n"),
                }));
              }}
              className="mt-1 block w-full input input-bordered mb-2"
            />
          ))
        }
          <button onClick={(e) => {
            e.preventDefault();
            setFormData((prevData) => ({
              ...prevData,
              ingredients: prevData.ingredients + "\n",
            }));
          }} className="btn btn-primary">Add Ingredient</button>
      </div>
      <div>
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-base-content"
        >
          Instructions
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full textarea textarea-bordered"
          required
        ></textarea>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button onClick={handleSubmit} className="btn btn-primary">
          {initialData && initialData?.title ? "Update Recipe" : "Create Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
