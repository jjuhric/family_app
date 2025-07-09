import { useEffect, useState } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import RecipePageSkeleton from "../../components/skeletons/RecipePageSkeleton";
import { Link } from "react-router-dom";

const RecipeHomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchRecipes, isFetchingRecipes } = useRecipeStore();

  // Fetch recipes when the component mounts
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

  // Filter recipes based on search term
  useEffect(() => {
    const filterRecipes = async () => {
      if (searchTerm.trim() === "") {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } else {
        const filteredRecipes = recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRecipes(filteredRecipes);
      }
    };
    filterRecipes();
  }, [searchTerm, fetchRecipes, recipes]);

  if (isFetchingRecipes) {
    return <RecipePageSkeleton />;
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <h1 className="text-2xl font-semibold ">Recipes</h1>
            <div className="mt-2">
              <ul className="list-disc list-inside">
                {recipes?.length > 0 ? (
                  recipes.map((recipe) => (
                    <li key={recipe._id} className="mt-2">
                      <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
                    </li>
                  ))
                ) : (
                  <span>No recipes found.</span>
                )}
              </ul>
            </div>
            <div className="mt-4">
              <Link to="/recipes/create" className="btn btn-primary">
                Create New Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHomePage;
