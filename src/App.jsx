import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InternalServerError from "./pages/InternalServerError";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subreddits from "./pages/Subreddits";
import Posts from "./pages/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Subreddits />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subreddits" element={<Subreddits />} />
        <Route path="/posts" element={<Posts />} />

        <Route path="/500" element={<InternalServerError />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
