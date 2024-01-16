import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PostCreator from "./components/PostCreator.jsx";
import PostEditor from "./components/PostEditor.jsx";
import CreateSubreddit from "./pages/CreateSubreddit";
import InternalServerError from "./pages/InternalServerError";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post.jsx";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register";
import Subreddit from "./pages/Subreddit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/subreddits/new" element={<CreateSubreddit />} />
        <Route exact path="/subreddits/:id" element={<Subreddit />} />
        <Route exact path="/subreddits/:id/:id" element={<Post />} />

        <Route path="/posts" element={<Posts />} />
        <Route exact path="posts/:id" element={<Post />} />
        <Route path="/submit" element={<PostCreator />} />
        <Route exact path="/post/:id/edit" element={<PostEditor />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="/server-error" element={<InternalServerError />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
