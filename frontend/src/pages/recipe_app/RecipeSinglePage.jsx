import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";
import { Edit3Icon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { TrashIcon } from 'lucide-react';


const RecipeSinglePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, deleteRecipe } = useRecipeStore();
  const [recipe, setRecipe] = useState(null);
  const { authUser } = useAuthStore();

  useEffect(() => {
    const fetchRecipe = async () => {
      const fetchedRecipe = await getRecipeById(id);
      setRecipe(fetchedRecipe);
    };
    fetchRecipe();
  }, [id, getRecipeById]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe._id);
      navigate("/recipes");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <div className="mt-14 p-4 card-bordered bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="flex justify-end">
        {authUser._id === recipe.userId && (
          <button className="btn btn-primary mr-2" onClick={() => navigate(`/recipes/edit/${id}`)}>
            <Edit3Icon className="w-4 h-4 mr-1" />
            Edit
          </button>
        )}
      {authUser._id === recipe.userId && (
        <button className="btn btn-danger" onClick={handleOpen}>
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </button>
      )}
      </div>
      <h1 className="text-2xl font-bold underline mb-2">{recipe.title}:</h1>
      <h2 className="font-light ml-2 mb-8 break-words">{recipe.author}</h2>
      <h2 className="text-xl font-semibold">Ingredients</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold">Instructions</h2>
      <p>{recipe.instructions}</p>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Confirm Deletion</h2>
          <p>Are you sure you want to delete this recipe?</p>
          <div className="modal-action">
            <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default RecipeSinglePage;
