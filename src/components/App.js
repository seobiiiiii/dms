import React,{useState,useEffect} from "react";
import AppRouter from "./Router";
import { authService } from "../myfbase";
import {onAuthStateChanged, updateCurrentUser,  } from "firebase/auth";

function App() { 
  const [init,setInit] = useState(false)
  const [Login, setLogin] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
    if (user) 
    {
      setLogin(true);
      setUserObj(user)
      if (user.displayName === null) 
      {
        const name = user.email.split('@')[0];
        user.displayName = name;
      }} else 
    {
      setLogin(false);
      setUserObj(null)
    }
    setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };

  return (
  <>
  {init ? <AppRouter refreshUser={refreshUser} 
  Login={Login} userObj={userObj}/> : "로딩중"}
  </>);
}

export default App;
