import React from "react";
import Attach from "../svg/Attach";

function Massage({ text, setText, hendleSubmit, setImg }) {
  return (
    <form className="massage_form" onSubmit={hendleSubmit}>
      <label htmlFor="img">
        {" "}
        <Attach />{" "}
      </label>
      <input
        type="file"
        accept="image/*"
        id="img"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div>
        <input
          type="text"
          placeholder="Enter Massage"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn"> Send </button>
      </div>
    </form>
  );
}

export default Massage;
