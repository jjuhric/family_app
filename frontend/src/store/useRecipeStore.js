import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const useRecipeStore = create((set) => ({
  recipes: [],
  fetchRecipes: async () => {
    try {
      const response = await axiosInstance.get("/recipes");
      set({ recipes: response.data });
    } catch (error) {
      toast.error(
        "Failed to fetch recipes",
        error.response?.data?.message || "Unknown error"
      );
    }
  },

  getRecipeById: async (id) => {
    try {
      const response = await axiosInstance.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      toast.error(
        "Failed to fetch recipe",
        error.response?.data?.message || "Unknown error"
      );
      throw error;
    }
  },

  createRecipe: async (recipeData) => {
    try {
      const response = await axiosInstance.post("/recipes", recipeData);
      set((state) => ({
        recipes: [...state.recipes, response.data],
      }));
      toast.success("Recipe created successfully");
    } catch (error) {
      toast.error(
        "Failed to create recipe",
        error.response?.data?.message || "Unknown error"
      );
    }
  },

  updateRecipe: async (id, recipeData) => {
    try {
      const response = await axiosInstance.put(`/recipes/${id}`, recipeData);
      set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe._id === id ? response.data : recipe
        ),
      }));
      toast.success("Recipe updated successfully");
    } catch (error) {
      toast.error(
        "Failed to update recipe",
        error.response?.data?.message || "Unknown error"
      );
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axiosInstance.delete(`/recipes/${id}`);
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe._id !== id),
      }));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      toast.error(
        "Failed to delete recipe",
        error.response?.data?.message || "Unknown error"
      );
    }
  },

  isRecipeLoading: false,
  setIsRecipeLoading: (isLoading) => set({ isRecipeLoading: isLoading }),
}));

export default useRecipeStore;
