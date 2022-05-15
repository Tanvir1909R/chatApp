import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
