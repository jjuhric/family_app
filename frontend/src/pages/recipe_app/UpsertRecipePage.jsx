import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "../../store/useRecipeStore";
import RecipeForm from "../../components/RecipeForm";

const UpsertRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const { getRecipeById, createRecipe, updateRecipe } = useRecipeStore();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };
    if (id) {
      fetchRecipe();
    } else {
      setRecipe({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
      });
    }
  }, [id, getRecipeById]);

  return (
    <div>
      <h1>{id ? "Edit Recipe" : "Create Recipe"}</h1>
      <RecipeForm
        initialData={recipe}
        onSubmit={id ? updateRecipe : createRecipe}
      />
    </div>
  );
};

export default UpsertRecipePage;
