import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InternalServerError from "./pages/InternalServerError";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Subreddits from "./pages/Subreddits";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Subreddits />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/subreddits" element={<Subreddits />} />
        <Route path="/posts" element={<Posts />} />

        <Route path="/not-found" element={<InternalServerError />}></Route>
        <Route path="/server-error" element={<InternalServerError />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
