import React,{ useEffect,useState } from "react"; 
import { signOut ,updateProfile} from "firebase/auth";
import { authService,dbService } from "../myfbase";
import {useNavigate}from "react-router-dom";
//import { collection, getDocs, query, where } from "@firebase/firestore";

const Profile = ({userObj,refreshUser}) => 
{
    const navigate = useNavigate();
    const auth = authService;
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const LogOutClick = () => 
    {
        signOut(auth);
        navigate("/", { replace: true });
    };

    const onChange = (event)=>{
        const {target: { value },}=event;
        setNewDisplayName(value);
    };

    const onSubmit =  async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(auth.currentUser, { displayName: newDisplayName });
            refreshUser();
            }
    }
/*
    const getMyDMS = async () => {
        const q = query(collection(dbService, "DMS"),
        where("creatorID", "==", `${userObj.uid}`));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
        };
        useEffect(() => {getMyDMS();},[]);        
*/
    return(
        <>
            <form onSubmit={onSubmit}>
                <input
                onChange={onChange} type="text"
                placeholder="이름"value={newDisplayName}
                />
                <input type="submit" value="Profile변경" />
            </form>
          <button onClick={LogOutClick}>Log Out</button>
        </>
    );
};
export default Profile;