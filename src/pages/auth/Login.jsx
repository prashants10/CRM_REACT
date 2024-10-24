import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../redux/slices/AuthSlice";
import { validateEmail } from "../../utils/validations";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDetails.password && formDetails.email) {
      const response = await dispatch(login(formDetails));
      if (response.payload) {
        navigate("/");
      } else {
        resetSignupState();
      }
    } else if (!validateEmail(formDetails.email)) {
      if (!formDetails.email) {
        toast.error("Please enter your email address");
      } else {
        toast.error("Please enter valid email address");
      }
    } else if (!formDetails.password) {
      toast.error("Please enter your password");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const resetSignupState = () => {
    setFormDetails({
      email: "",
      password: "",
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
            <h2 className="card-title text-4xl text-white">Login</h2>
          </div>
          <div className="w-full">
            <input
              name="email"
              autoComplete="one-time-code"
              type="text"
              placeholder="Email or username"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={formDetails.email}
            />
          </div>
          <div className="w-full">
            <input
              name="password"
              autoComplete="one-time-code"
              type="password"
              placeholder="Password"
              className="input text-white input-bordered input-primary w-full max-w-xs"
              onChange={handleInputChange}
              value={formDetails.password}
            />
          </div>
          <button className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">
            Submit
          </button>
          <p className="text-l text-white">
            Dont have an account ?{" "}
            <Link
              className="text-yellow-200 font-semibold hover:text-white"
              to="/signup"
            >
              Signup Instead
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Login;
