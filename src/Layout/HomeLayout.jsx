import { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/AuthSlice";

function HomeLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);

  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content m-4">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="drawer-button text-4xl ">
          <IoMenu className="cursor-pointer " />
        </label>
        <div className="flex items-start justify-center">
          <div className="w-3/4">{children}</div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/" className="text-lg text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-lg text-white">
              Dashboard
            </Link>
          </li>
          {authState.role === "admin" && (
            <li>
              <Link to="/users" className="text-lg text-white">
                All Users
              </Link>
            </li>
          )}
          <div className="absolute bottom-8 w-3/4">
            <div className="w-full flex justify-center items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="btn-primary px-2 py-1 rounded-md font-semibold w-full text-lg text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-secondary px-2 py-1 rounded-md font-semibold w-full text-lg text-center"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={onLogout}
                    className="btn-primary px-2 py-1 rounded-md font-semibold w-full text-lg"
                  >
                    Logout
                  </button>
                  <Link className="btn-secondary px-2 py-1 rounded-md font-semibold w-full text-center text-lg">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default HomeLayout;
