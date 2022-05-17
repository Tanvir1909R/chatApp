import React, { useEffect, useState } from "react";
import Camra from "../svg/Camra";
import { storage, db, auth } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
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
          setImg("");
        };
        uploadImg();
      }
    } catch (error) {
      console.log(error);
    }
  }, [img]);
  return (
    <section className="profile">
      <div className="profile_wrapper">
        <div className="user_img">
          <img src="./img/profile.jpg" alt="" />
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
          <h3>User Name</h3>
          <p>User Email</p>
          <hr />
          <small>Joined On: ...</small>
        </div>
      </div>
    </section>
  );
}

export default Profile;
