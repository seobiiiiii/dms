import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    }from 'firebase/auth';
import React, { useState } from "react";
import { authService } from "myfbase";

const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) =>
    {
        const {target: { name, value },} = event;

          if (name === "email") {setEmail(value);}
          else if (name === "password") {setPassword(value);}
    };

    const onSubmit = async(event) =>
    {
        event.preventDefault();
        try 
        {
            let data;
            const auth = getAuth();
            if (newAccount) 
            {
            data = await 
            createUserWithEmailAndPassword(auth, email, password);
            } else 
            {
            data = await 
            signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (error) 
        {
            console.log(error);
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev)
    const socialLogin = async(event) =>
    {
        const {target: { name },} = event;
        let provider;
            if (name === "google") 
            {
            provider = new GoogleAuthProvider();
            } else if (name === "github") 
            {
            provider = new GithubAuthProvider();
            }
            const data = await signInWithPopup(authService, provider);
            console.log(data);
    };

    return(
    <>
    <div>
        <input type='image' src='dmslogo.png'/>
    </div>
    
    <div>
        
        <form onSubmit={onSubmit}>

            
            <input name="email"
            type="email" placeholder="Email" 
            required value={email}
            onChange={onChange}
            />

            <input name="password"
            type="password" placeholder="Password" 
            required value={password}
            onChange={onChange}
            />

            <input 
            type="submit" 
            value={newAccount ? "새계정만들기" : "로그인"} 
            />
            {error}
        </form> 
        <span onClick={toggleAccount}>
            {newAccount ? "로그인" : "새계정만들기"}
        </span>
        <div>
            <button onClick={socialLogin} name='google' className='startgoo'>
                Google로 시작하기
            </button>
            <button onClick={socialLogin} name='github' className='startgit'>
                GitHub로 시작하기
            </button>
        </div>   
    </div>
    </>
    )
};
export default Auth;