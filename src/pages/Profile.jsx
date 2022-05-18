import React, { useEffect, useState } from "react";
import Camra from "../svg/Camra";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import IMG from '../fire/fire.png'
function Profile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((upDoc) => {
      if (upDoc.exists) {
        setUser(upDoc.data());
      }
    });
    try {
      if (img) {
        const uploadImg = async () => {
          const imgRef = ref(
            storage,
            `avater/${new Date().getTime()} - ${img.name}`
          );
          const upload = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, upload.ref.fullPath));
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avaterUrl: url,
            avaterPath: upload.ref.fullPath,
          });
          if(user.avaterPath){
            await deleteObject(ref(storage, user.avaterPath))
          }
          setImg("");
        };
        uploadImg();
      }
    } catch (error) {
      console.log(error);
    }
  }, [img]);
  return user ? (
    <section className="profile">
      <div className="profile_wrapper">
        <div className="user_img">
          <img src={user.avaterUrl || IMG} alt="" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camra />
              </label>
              <input
                type="file"
                accept="image/*"
                id="photo"
                style={{ display: "none" }}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="user_dec">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined On : {user.createAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null
}

export default Profile;
