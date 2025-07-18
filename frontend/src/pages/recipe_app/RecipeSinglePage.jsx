import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";

const RecipeSinglePage = () => {
  const { id } = useParams();

  const { getRecipeById } = useRecipeStore();
  const [recipe, setRecipe] = useState(null);

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
      <h1 className="text-2xl font-bold underline mb-2">{recipe.title}:</h1>
      <h2 className="font-light ml-2 mb-4 row-span-3 break-words">{recipe.author}</h2>
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
