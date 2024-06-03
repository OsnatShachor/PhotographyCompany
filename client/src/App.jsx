import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./pages/LogIn";
import PhotographerPage from "./pages/PhotographerPage";
import SignUp from "./pages/SignUp";
import './App.css';

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/photographer/:id" element={<PhotographerPage />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
