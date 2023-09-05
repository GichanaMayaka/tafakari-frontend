import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InternalServerError from "./pages/InternalServerError";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Subreddits from "./pages/Subreddits";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post.jsx";
import PostEditor from "./components/PostEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/subreddits" element={<Subreddits />} />

        <Route path="/posts" element={<Posts />} />
        <Route exact path="/posts/:id" element={<Post />} />
        <Route path="/submit" element={<PostEditor />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/server-error" element={<InternalServerError />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
