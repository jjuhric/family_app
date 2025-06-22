import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Beef, Menu } from "lucide-react";
import { useRef } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const dropdownRef = useRef(null);

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Hamburger menu for small screens */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" ref={dropdownRef}>
              <Menu className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/" className="flex items-center gap-2.5" onClick={() => dropdownRef.current.blur()}>
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>Family Chat</span>
                </Link>
              </li>
              {authUser && (
                <>
              <li>
                <Link to="/recipe" className="flex items-center gap-2.5" onClick={() => dropdownRef.current.blur()}>
                  <Beef className="w-5 h-5 text-primary" />
                  <span>Recipe</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center gap-2.5" onClick={() => dropdownRef.current.blur()}>
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </li>
                  <li onClick={() => dropdownRef.current.blur()}>
                    <Link to="/profile" className="flex items-center gap-2.5" >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  </li> 
                  <li onClick={() => dropdownRef.current.blur()}>
                    <button onClick={logout} className="flex items-center gap-2.5">
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Regular navigation for large screens */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Family Chat</h1>
            </Link>
            <Link to="/recipe" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Beef className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Recipe</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Add a banner to say DEVELOPMENT here if we are in development */}
                {import.meta.env.DEV && (
                  <h1 className="bg-red-500 text-white text-center py-2 text-sm font-bold">
                    DEVELOPMENT MODE
                  </h1>
                )}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
