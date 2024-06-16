import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./pages/LogIn";
import PhotographerPage from "./pages/PhotographerPage";
import SignUp from "./pages/SignUp";
import Request from"./pages/Request";
import PriceList from "./pages/PriceList";
import './App.css';
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/PriceList/:id" element={<PriceList/>}/>
          <Route path="/photographer/:id" element={<PhotographerPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
