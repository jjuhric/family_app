import { useEffect, useState } from "react";
import useRecipeStore from "../../store/useRecipeStore";
import RecipePageSkeleton from "../../components/skeletons/RecipePageSkeleton";
import { Link } from "react-router-dom";

const RecipeHomePage = () => {
  const { recipes, fetchRecipes, isFetchingRecipes } = useRecipeStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        recipe.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes([]);
    }
  }, [searchTerm, recipes]);

  if (isFetchingRecipes) {
    return <RecipePageSkeleton />;
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center outline-double">
            <h1 className="text-2xl font-semibold underline mb-4">Recipes</h1>
            <div className="flex items-center justify-center mb-4">
              {/* Search bar */}
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="mt-2">
              <ul className="list-disc list-inside">
                {!filteredRecipes.length > 0 && recipes?.length > 0 ? (
                  recipes.map((recipe) => {
                    return (
                      <li key={recipe._id} className="mt-2">
                        <Link to={`/recipes/${recipe._id}`}>
                          {recipe.title} <br />
                          <span className="text-sm text-gray-500">
                            {recipe.description}
                          </span>
                        </Link>
                      </li>
                    );
                  })
                ) : filteredRecipes.length === 0 ? (
                  <span>No recipes found.</span>
                ) : (
                  filteredRecipes.map((filteredRecipe) => (
                    <li key={filteredRecipe._id} className="mt-2">
                      <Link to={`/recipes/${filteredRecipe._id}`}>
                        {filteredRecipe.title} <br />
                        <span className="text-sm text-gray-500">
                          {filteredRecipe.description}
                        </span>
                      </Link>
                    </li>
                  ))
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
