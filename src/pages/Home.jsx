import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IMG from "../fire/fire.png";
import Massage from "../components/Massage";
import MassageField from "../components/MassageField";

function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [user1]));
    const unsub = onSnapshot(q, (quarySnapshot) => {
      let userData = [];
      quarySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      setUsers(userData);
    });
    return () => unsub();
  }, []);
  const selectUser = (userSelect) => {
    setChat(userSelect);
    const user2 = userSelect.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const massageRef = collection(db, "massages", id, "chat");
    const q = query(massageRef, orderBy("massageAt", "asc"));

    onSnapshot(q, (quarySnap) => {
      let msg = [];
      quarySnap.forEach((doc) => {
        msg.push(doc.data());
      });
      setMsgs(msg);
    });
  };
  console.log(msgs);
  const hendleSubmit = async (e) => {
    e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `imges/${new Date().getTime()} - ${img.name}`
      );
      const upload = await uploadBytes(imgRef, img);
      const Url = await getDownloadURL(ref(storage, upload.ref.fullPath));
      url = Url;
    }
    await addDoc(collection(db, "massages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      massageAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user, index) => {
          return (
            <>
              <div
                className="users_wrapper"
                key={index}
                onClick={() => {
                  selectUser(user);
                }}
              >
                <div className="user_info">
                  <div className="user_ditail">
                    <img
                      src={user.avaterUrl || IMG}
                      alt="avater"
                      className="avater"
                    />
                    <h4>{user.name}</h4>
                  </div>
                  <div
                    className={`user_state ${
                      user.isOnline ? "online" : "offline"
                    }`}
                  ></div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="massage_container">
        {chat ? (
          <>
            <div className="massage_user">
              <h3> {chat.name} </h3>
            </div>
            <div className="massages">
              {
                msgs.length ? msgs.map((msg,i)=> <MassageField key={i} msg={msg} />) : null 
              }
            </div>
            <Massage
              text={text}
              setText={setText}
              hendleSubmit={hendleSubmit}
              setImg={setImg}
              user1={user1}
            />
          </>
        ) : (
          <h3 className="no_conv"> select a user to start </h3>
        )}
      </div>
    </div>
  );
}

export default Home;
