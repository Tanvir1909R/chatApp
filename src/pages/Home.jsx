import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import IMG from "../fire/fire.png";

function Home() {
  const [users, setUsers] = useState([]);
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
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => {
          return (
            <div className="users_wrapper">
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
          );
        })}
      </div>
    </div>
  );
}

export default Home;
