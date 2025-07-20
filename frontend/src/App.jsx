import Navbar from "./components/Navbar";

import HomePage from "./pages/chat_app/HomePage";
import SignUpPage from "./pages/chat_app/SignUpPage";
import LoginPage from "./pages/chat_app/LoginPage";
import SettingsPage from "./pages/chat_app/SettingsPage";
import ProfilePage from "./pages/chat_app/ProfilePage";
// import ComingSoonPage from "./pages/recipe_app/ComingSoon";
import UpsertRecipePage from "./pages/recipe_app/UpsertRecipePage";
import ChangePasswordPage from "./pages/chat_app/ChangePasswordPage";
import RecipeHomePage from "./pages/recipe_app/RecipeHomePage";
import RecipeSinglePage from "./pages/recipe_app/RecipeSinglePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
// const IS_DEV = import.meta.env.DEV;

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
       <Route
          path="/recipes"
          element={authUser ? <RecipeHomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/recipes/:id"
          element={authUser ? <RecipeSinglePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/recipes/create"
          element={authUser ? <UpsertRecipePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/recipes/edit/:id"
          element={authUser ? <UpsertRecipePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/change-password"
          element={authUser ? <ChangePasswordPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
