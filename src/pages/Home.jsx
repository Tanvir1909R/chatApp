import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import IMG from "../fire/fire.png";
import Massage from "../components/Massage";

function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
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
    setChat(userSelect)
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
          <Massage />
          </>
        ) : (
          <h3 className="no_conv"> select a user to start </h3>
        )}
      </div>
    </div>
  );
}

export default Home;
