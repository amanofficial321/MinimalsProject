import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Forgot1 from "./components/Forget1";
import Blog from "./components/Blog";
import Profile from "./components/Profile";
import New_post from "./components/New_post";
import About_social from "./components/About_social";
import About_social2 from "./components/About_social2";
// import Blogopen from "./components/Blogopen";
import Homepage from "./components/Homepage";
import Profilepic from "./components/Profilepic";
import Guest from "./components/Guest";
import BlogopenAman from "./components/BlogopenAman";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/About_social" element={<About_social />} />
        <Route path="/About_social2" element={<About_social2 />} />
        <Route path="/Guest" element={<Guest />} />
        <Route path="/Forgot1" element={<Forgot1 />} />
        <Route
          path="/Profilepic"
          element={<ProtectedRoute Component={<Profilepic />} />}
        />
        <Route path="/Blog" element={<ProtectedRoute Component={<Blog />} />} />
        <Route
          path="/Profile"
          element={<ProtectedRoute Component={<Profile />} />}
        />
        <Route
          path="/New_post"
          element={<ProtectedRoute Component={<New_post />} />}
        />
        <Route
          path="/Blog/Blogopen/:id"
          element={<ProtectedRoute Component={<BlogopenAman />} />}
        />
      </Routes>
    </>
  );
}

export default App;
