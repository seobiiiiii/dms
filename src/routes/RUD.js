import React, { useState } from "react";
import { dbService,storageService } from"myfbase";
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from "@firebase/storage";

const RUD = ({ DMSObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDMS, setNewDMS] = useState(DMSObj.text);

  const Textdata =doc(dbService, "DMS", `${DMSObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("글을 삭제하시겠습니까?");
    if (ok) 
    {
      await deleteDoc(Textdata);
      await deleteObject(ref(storageService, DMSObj.attachmentUrl));
    }
  };
  
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(Textdata,{text: newDMS,});
    setEditing(false);
  };

  const onChange = (event) => {
    const {target: { value },} = event;
    setNewDMS(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="당신의 글을 수정하세요"
              value={newDMS}
              required
              onChange={onChange}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{DMSObj.text}</h4>
          {DMSObj.attachmentUrl && (
            <img src={DMSObj.attachmentUrl} alt="attachment" width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제하기</button>
              <button onClick={toggleEditing}>수정하기</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RUD;