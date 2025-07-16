import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";
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
    <div className="h-screen pt-20 px-50">
      <h1 className="text-2xl font-semibold text-center underline">{id ? "Edit Recipe" : "Create Recipe"}</h1>
      <h6 className="text-center text-sm px-2 my-4">
        List all ingredients separated by commas, e.g. &quot;1 cup flour, 2 eggs, 1/2 cup sugar&quot;
      </h6>
      <span className="mt-4 flex justify-center text-sm">Do <strong>&nbsp;NOT&nbsp;</strong> include quotations.</span>
      <RecipeForm
        initialData={recipe}
        onSubmit={id ? updateRecipe : createRecipe}
      />
    </div>
  );
};

export default UpsertRecipePage;
