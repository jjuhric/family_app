import Recipe from "../models/recipe.model.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username");
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error in getRecipes: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("user", "username");

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error in getRecipeById: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const userId = req.user._id;

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      user: userId,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error in createRecipe: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, description, ingredients, instructions },
      { new: true }
    ).populate("user", "username");

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error in updateRecipe: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRecipe: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
