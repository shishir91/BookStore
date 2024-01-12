import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBook from "./pages/AddBook";
import Dashboard from "./pages/Dashboard";
import "./assets/sass/main.scss";
import Explore from "./pages/Explore";
import EditBook from "./pages/EditBook";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<>About Us</>} />
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="editBook" element={<EditBook />} />
          </Route>
          <Route path="*" element={<b>Page Not Found</b>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
