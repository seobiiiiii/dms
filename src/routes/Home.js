import React, { useState, useEffect, useRef } from "react";
import { dbService, dbAddDoc, dbCollection,qr,storageService } from "myfbase";
import { onSnapshot, orderBy} from "firebase/firestore";
import { ref, uploadString ,getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from 'uuid'
import RUD from "./RUD";

const Home = ({userObj}) => 
{
    const [DMS, setDMS] = useState("");
    const [newdata,setnewdata] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
      const q = qr(dbCollection(dbService, "DMS"),
      orderBy("createAt","desc"));

      onSnapshot(q, (snapshot) => {
      const dmsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setnewdata(dmsArr);
        });
    }, []);
    
    const onSubmit = async(event) => 
    {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") 
        {
          const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(attachmentRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(response.ref);
          console.log(response);
        }
        const dmsPost ={
          text: DMS,
          createAt: Date.now(),
          creatorID: userObj.uid,
          attachmentUrl
        };
        await dbAddDoc(dbCollection(dbService, "DMS"),dmsPost);
        setDMS("");
        setAttachment("");
    };

    const onChange = ({target: { value }}) => {setDMS(value);};

    const onFileChange = (event) => {
      const {target: { files },} = event;
      const theFile = files[0];
      if (theFile) {
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          const {currentTarget: { result },} = finishedEvent;
          setAttachment(result);
        };
        reader.readAsDataURL(theFile);
      }
    };
    const fileInput = useRef();
    const onClearAttachment = () =>{
      setAttachment("");
      fileInput.current.value = null;
    } 
    
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={DMS} onChange={onChange}
            type="text" placeholder="나의 일상과 생각을 공유해요"
            maxLength={150}
          />

          <input type="file" accept="image/*" onChange={onFileChange}ref={fileInput}/>
          
          <input type="submit" value="작성하기" />
          {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px" />
            <button onClick={onClearAttachment}>
              지우기
            </button>
          </div>
        )}
        </form>
        <div>
        {newdata.map((DMS) => (
          <RUD 
          key={DMS.id} 
          DMSObj={DMS}
          isOwner={DMS.creatorID === userObj.uid}/>
        ))}
        </div>
      </div>
    );
};
export default Home;
