import React from "react";
import { Toaster } from "react-hot-toast";
import { FiHome } from "react-icons/fi";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import lostItem from "./components/Lostitem";
import DashBoard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignupForm from "./pages/Signup";
import LostItem from "./components/Lostitem";

const App = () => {
  return (
    <div>
          <Navbar/>

          <Routes>
            <Route exact path="/"  element={<Home/>} />
            <Route exact path="/lostItem"  element={<LostItem/>} />
            <Route exact path="/login"  element={<Login/>} />
            <Route exact path="/signup"  element={<SignupForm/>} />
            <Route exact path="/dashboard"  element={<DashBoard/>} />
          </Routes>
          <Toaster />
    </div>
  );
};

export default App;
