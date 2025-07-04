import { useEffect, useState } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import RecipePageSkeleton from "../../components/skeletons/RecipePageSkeleton";

const RecipeHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const { fetchRecipes } = useRecipeStore();
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    loadRecipes();
  }, [fetchRecipes]);
  if (!recipes?.length) {
    return <RecipePageSkeleton />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Recipe List</h1>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeHomePage;
