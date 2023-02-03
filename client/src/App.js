import React, { useState } from "react";
import './App.css';
import Home from "./pages/Home";
import Navbar from "./componenets/Navbar/Navbar";
import Footer from "./componenets/Footer/Footer";
import Exercices from "./pages/Exercices";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import SignIn from "./pages/Login";
import Layout from "./Layout";
//import RequireAuth from "./componenets/Register/RequireAuth";
import PersistLogin from "./componenets/Register/PresistLogin";

import {Routes, Route} from 'react-router-dom'
import CalorieTracker from "./pages/CalorieTracker";



function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    return(
            <div className="App">
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                <Routes>
                    <Route  path="/" element={<Layout />}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Register" element={<Register/>}/>
                        <Route path="/SignIn" element={<SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route element={<PersistLogin/>}>
                            {/*<Route element={<RequireAuth/>}>*/}
                                <Route path="/Exercices" element={<Exercices/>}/>
                                <Route path="/Dashboard" element={<Dashboard />}/>
                                <Route path="/CalorieTracker" element={<CalorieTracker />}/>
                            {/*</Route>*/}
                        </Route>
                    </Route>
                </Routes>
                <Footer />
            </div>
        
    );
}

export default App;