import React from "react";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Home from "./pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="user/:userID" element={<User />} />
    </Routes>
  );
};
export default Router;
