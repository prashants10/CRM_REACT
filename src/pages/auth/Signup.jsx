import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { sigunup } from "../../redux/slices/AuthSlice";
import { validateEmail, validatePassword } from "../../utils/validations";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
    clientName: "",
    userType: "",
    userStatus: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, clientName, userType } = signupDetails;
    if (name && email && password && clientName && userType) {
      const response = await dispatch(sigunup(signupDetails));
      if (response.payload) {
        navigate("/login");
      } else {
        resetSignupState();
      }
    } else if (!validateEmail(email)) {
      console.log(email);
      console.log("true");

      if (!email) {
        toast.error("Please enter your email address");
      } else {
        toast.error("Please enter valid email address");
      }
    } else if (!validatePassword(password)) {
      if (!password) {
        toast.error("Please enter your password");
      } else {
        toast.error(
          "Passsword must be at least 8 charcters long, contains atleast one special charcter, and one number"
        );
      }
    }
  };

  const handleUserType = (e) => {
    let user = e.target.textContent.toLowerCase();
    const dropDown = document.getElementById("user-dropdown");
    dropDown.open = false;
    setSignupDetails({
      ...signupDetails,
      userType: user,
      userStatus: user === "customer" ? "approved" : "suspended",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const resetSignupState = () => {
    setSignupDetails({
      email: "",
      password: "",
      name: "",
      userType: "",
      userStatus: "",
      clientName: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center h-[90vh]"
    >
      <div className="card w-96 bg-sky-900 text-primary-content">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Signup</h2>
          </div>
          <div className="w-full">
            <input
              autoComplete="one-time-code"
              type="text"
              name="name"
              placeholder="Full name"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={signupDetails.name}
            />
          </div>
          <div className="w-full">
            <input
              autoComplete="one-time-code"
              type="email"
              name="email"
              placeholder="Email"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={signupDetails.email}
            />
          </div>
          <div className="w-full">
            <input
              autoComplete="one-time-code"
              type="password"
              name="password"
              placeholder="Password"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={signupDetails.password}
            />
          </div>
          <div className="w-full">
            <input
              autoComplete="one-time-code"
              type="text"
              name="clientName"
              placeholder="Client Name"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={signupDetails.clientName}
            />
          </div>
          <details className="dropdown mb-4 w-full" id="user-dropdown">
            <summary className="btn">
              {signupDetails.userType ? signupDetails.userType : "User Type"}
            </summary>
            <ul
              onClick={handleUserType}
              name="userType"
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52"
            >
              <li>
                <a>Customer</a>
              </li>
              <li>
                <a>Engineer</a>
              </li>
              <li>
                <a>Admin</a>
              </li>
            </ul>
          </details>
          <button className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">
            Submit
          </button>
          <p className="text-l text-white">
            Already have an account ?{" "}
            <Link
              className="text-yellow-200 font-semibold hover:text-white"
              to="/login"
            >
              Login Instead
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Signup;
