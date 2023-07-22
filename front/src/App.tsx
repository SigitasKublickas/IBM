import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Alert } from "./components/dialog";
import { api } from "./api";
import { Rates } from "./components/rates";

function App() {
  const [expand, setExpand] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        axios
          .post("http://localhost:8000/image", {
            image: reader.result,
          })
          .then((res: any) => {
            setExpand(true);
            setMsg(res.data.msg);
          })
          .catch((err) => console.log(err));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="App">
      <div className="file-drop-area">
        <span className="fake-btn">Choose files</span>
        <span className="file-msg">or drag and drop files here</span>
        <input
          className="file-input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      </div>
      <Rates />
      {expand && (
        <Alert
          text={msg}
          click={() => {
            setExpand(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
