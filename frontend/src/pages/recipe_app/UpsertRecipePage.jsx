import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecipeStore from "../../store/useRecipeStore";
import RecipeForm from "../../components/RecipeForm";
import { useAuthStore } from "../../store/useAuthStore";

const UpsertRecipePage = () => {
  const { authUser } = useAuthStore();
  const [recipe, setRecipe] = useState(
    {
        title: "",
        author:  authUser.fullName,
        ingredients: "",
        instructions: "",
      }
  );
  const { id } = useParams();
  const { getRecipeById, createRecipe, updateRecipe } = useRecipeStore();


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe({
          _id: recipeData._id,
          title: recipeData.title,
          author: recipeData.author,
          ingredients: recipeData.ingredients.join("\n"),
          instructions: recipeData.instructions,
        });
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };
    if (id) {
      fetchRecipe();
    } else {
      setRecipe({
        title: "",
        author:  authUser.fullName,
        ingredients: "",
        instructions: "",
      });
    }
  }, [id, getRecipeById, authUser.fullName]);

  return (
    <div className="h-screen pt-20 px-50">
      <h1 className="text-2xl font-semibold text-center underline">{id ? "Edit Recipe" : "Create Recipe"}</h1>
      <RecipeForm
        initialData={recipe}
        onSubmit={id ? updateRecipe : createRecipe}
      />
    </div>
  );
};

export default UpsertRecipePage;
