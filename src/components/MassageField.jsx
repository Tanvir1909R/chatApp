import React, { useEffect, useRef } from "react";
import { auth } from "../firebase";

function MassageField({ msg }) {
  const scrollRef = useRef()
    const user1 = auth.currentUser.uid

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
    })
  return (
    <div className={`massage_wrapper ${msg.from === user1 ? "own" : ""}`} ref={scrollRef}>
      <p className={msg.from === user1 ? 'me' : 'friend'}>
        {msg.media ? <img src={msg.media} alt="uploadImg" /> : null}
        {msg.text}
        <br />
      </p>
    </div>
  );
}

export default MassageField;
