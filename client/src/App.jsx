import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./pages/LogIn";
import PhotographerClientPage from "./pages/PhotographerClientPage";
import SignUp from "./pages/SignUp";
import Request from "./pages/Request";
import PriceList from "./pages/PriceList";
import Order from "./pages/Order";
import PrivateArea from './pages/PrivateArea'
import ManagerPage from "./pages/ManagerPage";
import PhotographerPage from "./pages/PhotographerPage"
import './App.css';
import UploadPhoto from "./pages/UploadPhoto";
export const UserContext = createContext();
export const PhotographerContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/YO/logIn" element={<LogIn />} />
          <Route path="/YO/SignUp" element={<SignUp />} />
          <Route path="/YO/manager" element={<ManagerPage/>}/>
          <Route path="/YO/Request" element={<Request />} />
          <Route path="/YO/photographer/:id" element={<PhotographerClientPage />} />
          <Route path="/YO/photographerManagement/:id" element={<PhotographerPage />} />
          <Route path="/YO/photographer/:id/order" element={<Order />} />
          <Route path="/YO/photographer/:id/PriceList" element={<PriceList />} />
          <Route path="/YO/photographer/:id/PrivateArea/:id" element={<PrivateArea />} />
          <Route path="/YO/photographer/:id/PhotoManagement" element={<UploadPhoto />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;