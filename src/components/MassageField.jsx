import React from "react";
import { auth } from "../firebase";

function MassageField({ msg }) {
    const user1 = auth.currentUser.uid
  return (
    <div className={`massage_wrapper ${msg.from === user1 ? "own" : ""}`}>
      <p className={msg.from === user1 ? 'me' : 'friend'}>
        {msg.media ? <img src={msg.media} alt="uploadImg" /> : null}
        {msg.text}
        <br />
      </p>
    </div>
  );
}

export default MassageField;
