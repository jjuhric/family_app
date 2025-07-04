import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
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
      navigate("/recipe");
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
          htmlFor="description"
          className="block text-sm font-medium text-base-content"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
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
          rows="3"
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
      <div>
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update Recipe" : "Create Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
