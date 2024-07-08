import React, { useState, createContext, useEffect } from "react";
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
import HandleOrders from "./pages/HandleOrders";

export const UserContext = createContext();
export const PhotographerContext = createContext();

function App() {
  const [user, setUser] = useState({});


  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/authenticate', {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            try {
              const response = await fetch(`http://localhost:3000/users/${data.user.userID}`, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
                }
              });
              if (response.ok) {
                const data = await response.json();
                setUser(data[0]);
              }
            }
            catch {
              console.error('Error fetching conected user:', error);
            }
          } else {
            console.error('Authentication failed');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
        }
      }
    };

    fetchAuthenticatedUser();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/YO/logIn" element={<LogIn />} />
          <Route path="/YO/SignUp" element={<SignUp />} />
          <Route path="/YO/manager" element={<ManagerPage />} />
          <Route path="/YO/Request" element={<Request />} />
          <Route path="/YO/photographer/:id" element={<PhotographerClientPage />} />
          <Route path="/YO/photographerManagement/:id" element={<PhotographerPage />} />
          <Route path="/YO/photographer/:id/order" element={<Order />} />
          <Route path="/YO/photographer/:id/PriceList" element={<PriceList />} />
          <Route path="/YO/photographer/:id/PrivateArea" element={<PrivateArea />} />
          <Route path="/YO/photographer/:id/PhotoManagement" element={<UploadPhoto />} />
          <Route path="/YO/photographer/:id/PhotoManagement/orders" element={<HandleOrders />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
