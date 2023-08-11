import React from "react";
import { HashRouter as HRouter , Routes , Route,Navigate  } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
const AppRouter=({refreshUser,Login,userObj})=>{
    return(
        <HRouter>
            {Login && <Navigation userObj={userObj}/>}
            <Routes>
                {Login ? (
                <>
                <Route path="/" element = {<Home userObj={userObj}/>}/> 
                <Route path="/profile" replace to="/" 
                element = {<Profile refreshUser={refreshUser} userObj={userObj}/>}/> 
                <Route path="*" element = {<Navigate to="/" replace/>}/> 
                </>
                ):(
                    <>
                    <Route path="/" element = {<Auth/>}/>
                    <Route path="*" element = {<Navigate to="/" replace/>}/> 
                    </>
                )}
            </Routes>
        </HRouter>
    )
}

export default AppRouter;