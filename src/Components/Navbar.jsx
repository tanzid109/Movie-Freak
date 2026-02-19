import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaBars, FaFilm, FaUser } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinkStyle = ({ isActive }) =>
    `relative px-2 py-1 font-semibold transition duration-300 
     ${isActive ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}
     after:absolute after:left-0 after:bottom-0 after:h-[2px] 
     after:bg-yellow-400 after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-3xl bg-gradient-to-b from-gray-900 to-black">
      <div className="md:w-10/12 mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex justify-center items-center gap-2 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg">
            <FaFilm className="text-2xl text-white" />
          </div>
          Movie Freak
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/allmovies" className={navLinkStyle}>
            All Movies
          </NavLink>

          <NavLink to="/form" className={navLinkStyle}>
            Feedback
          </NavLink>

          {user?.email && (
            <>
              <NavLink to="/addmovie" className={navLinkStyle}>
                Add Movie
              </NavLink>

              <NavLink to="/myfavourite" className={navLinkStyle}>
                My Favorites
              </NavLink>
            </>
          )}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Avatar */}
          {user?.email ? (
            <img
              src={user.photoURL}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-yellow-400 hover:scale-110 transition"
            />
          ) : (
            <FaUser className="text-2xl text-gray-300" />
          )}

          {/* Auth Buttons */}
          {user?.email ? (
            <button
              onClick={logOut}
              className="px-5 py-2 rounded-xl font-semibold 
              bg-gradient-to-r from-red-500 to-red-700 
              hover:scale-105 transition shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl font-semibold 
                bg-gradient-to-r from-yellow-400 to-orange-500 text-black
                hover:scale-105 transition shadow-md"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 rounded-xl font-semibold 
                bg-gradient-to-r from-yellow-700 to-orange-500 transition text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="cursor-pointer">
            <FaBars className="text-xl text-yellow-400" />
          </label>

          <ul className="dropdown-content flex flex-col mt-3 p-4 shadow-xl rounded-2xl bg-gray-900 space-y-3 w-56">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/allmovies" className={navLinkStyle}>
              All Movies
            </NavLink>

            <NavLink to="/form" className={navLinkStyle}>
              Feedback
            </NavLink>

            {user?.email && (
              <>
                <NavLink to="/addmovie" className={navLinkStyle}>
                  Add Movie
                </NavLink>

                <NavLink to="/myfavourite" className={navLinkStyle}>
                  My Favorites
                </NavLink>
              </>
            )}

            <div className="pt-3 border-t border-white/10">
              {user?.email ? (
                <button
                  onClick={logOut}
                  className="w-full px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 rounded-xl 
                    bg-yellow-400 text-black font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 rounded-xl mt-2 
                    bg-white/10 hover:bg-white/20 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
