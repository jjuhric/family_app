import { useEffect, useState } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import RecipePageSkeleton from "../../components/skeletons/RecipePageSkeleton";
import { Link } from "react-router-dom";

const RecipeHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const { fetchRecipes, isFetchingRecipes, getRecipeById } = useRecipeStore();
  
  useEffect(() => {    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500); // 500ms debounce time

      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);

    useEffect(() => {
      if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm.length === 0) {
        const loadRecipes = async () => {
          try {
            const fetchedRecipes = await getRecipeById(debouncedSearchTerm);
            setRecipes(fetchedRecipes);
          } catch (error) {
            console.error("Failed to fetch recipes:", error);
          }
        };
        loadRecipes();
      }
    }, [debouncedSearchTerm, fetchRecipes]);
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
  if (isFetchingRecipes) {
    return <RecipePageSkeleton />;
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Recipes</h1>
            <p className="mt-2">
              <ul className="list-disc list-inside">
                {recipes?.length > 0 ? (
                  recipes.map((recipe) => (
                    <li key={recipe._id} className="mt-2">
                      <Link to={`/recipes/${recipe._id}`}>
                        {recipe.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>No recipes found.</p>
                )}
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHomePage;
