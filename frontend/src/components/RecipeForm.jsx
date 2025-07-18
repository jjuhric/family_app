import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
      navigate("/recipes");
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  if (!formData) {
    return <div>Loading form...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-base-100 rounded-lg shadow-md"
    >
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
        <textarea
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          rows="1"
          className="mt-1 block w-full textarea textarea-bordered"
          required
        ></textarea>
      </div>
      <div>
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-base-content"
        >
          Ingredients
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          rows="1"
          className="mt-1 block w-full textarea textarea-bordered"
          required
        ></textarea>
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
        <button type="submit" className="btn btn-primary">
          {initialData && initialData?.title ? "Update Recipe" : "Create Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
