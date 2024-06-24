import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./pages/LogIn";
import PhotographerPage from "./pages/PhotographerPage";
import SignUp from "./pages/SignUp";
import Request from "./pages/Request";
import PriceList from "./pages/PriceList";
import Order from "./pages/Order";
import PrivateArea from './pages/PrivateArea'
import './App.css';
import ManagerPage from "./pages/ManagerPage";
export const UserContext = createContext();
export const PhotographerContext = createContext();

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
          <Route path="/photographer/:id" element={<PhotographerPage />} />
          <Route path="/photographer/:id/order" element={<Order />} />
          <Route path="/photographer/:id/PriceList" element={<PriceList />} />
          <Route path="/photographer/:id/PrivateArea" element={<PrivateArea />} />
          <Route path="/maneger" element={<ManagerPage/>}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;