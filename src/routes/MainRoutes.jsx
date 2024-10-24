import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthRoutes from "./AuthRoutes";
import ListAllUsers from "../pages/user/ListAllUsers";
import CreateTicket from "../pages/tickets/CreateTicket";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/ticket/create" element={<CreateTicket />} />
      <Route element={<AuthRoutes allowListedRoles={["admin"]} />}>
        <Route path="/users" element={<ListAllUsers />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default MainRoutes;
