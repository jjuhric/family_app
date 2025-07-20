import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";
import { Edit3Icon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";


const RecipeSinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById } = useRecipeStore();
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
  return (
    <div className="mt-14 p-4 card-bordered bg-base-100 shadow-xl max-w-2xl mx-auto">
      <div className="flex justify-end">
        {/* {authUser._id === recipe.userId && ( */}
        <button className="btn btn-primary mr-2" onClick={() => navigate(`/recipes/edit/${id}`)}>
          <Edit3Icon className="w-4 h-4 mr-1" />
          Edit
        </button> {/* )} */}
        {/* <button className="btn btn-danger" onClick={() => { console.log("Delete recipe"); }}>
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </button> */}
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
    </div>
  );
};

export default RecipeSinglePage;
