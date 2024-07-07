import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LogIn from "./pages/LogIn";
import PhotographerClientPage from "./pages/PhotographerClientPage";
import SignUp from "./pages/SignUp";
import Request from "./pages/Request";
import PriceList from "./pages/PriceList";
import Order from "./pages/Order";
import PrivateArea from './pages/PrivateArea'
import ManagerPage from "./pages/ManagerPage";
import PhotographerPage from "./pages/PhotographerPage";
import './App.css';
import UploadPhoto from "./pages/UploadPhoto";
import HandleOrders from "./pages/HandleOrders";

export const UserContext = createContext();
const photographerID=useParams();
function App() {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    // Logic to check if user is authenticated
    
    try {
      const accessToken=sessionStorage.getItem("accessToken")
      const response = fetch('http://localhost:3000/auth',
          {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' +accessToken,
                'Content-Type': 'application/json'
              },
              body:photographerID
          });
        } catch (error) {
          console.error('Error fetching waiting requests:', error);
      }
      // Set user state or fetch user data based on token
      setUser({ /* User data fetched from server */ });
    
  }, []);
  const getConectedUser = async () => {
    
        const allRequests = await response.json();
        console.log(allRequests);
        setAllRequests(allRequests);
  
};

  // const PrivateRoute = ({ element, ...props }) => {
  //   return user ? element : <Navigate to="/YO/logIn" />;
  // };

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
          <PrivateRoute path="/YO/photographerManagement/:id" element={<PhotographerPage />} />
          <PrivateRoute path="/YO/photographer/:id/order" element={<Order />} />
          <PrivateRoute path="/YO/photographer/:id/PriceList" element={<PriceList />} />
          <PrivateRoute path="/YO/photographer/:id/PrivateArea/:id" element={<PrivateArea />} />
          <PrivateRoute path="/YO/photographer/:id/PhotoManagement" element={<UploadPhoto />} />
          <PrivateRoute path="/YO/photographer/:id/PhotoManagement/orders" element={<HandleOrders />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
