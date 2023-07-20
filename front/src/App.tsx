import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Alert } from "./components/dialog";

function App() {
  const [base64Image, setBase64Image] = useState<any>("");
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
      <div className="price-chart">
        <table>
          <tr>
            <td>Daytime / Type</td>
            <td>Motocycle</td>
            <td>Car</td>
            <td>Bus / Track</td>
          </tr>
          <tr>
            <td>Monday - Thursday {"(8am-5pm)"}</td>
            <td>0.5 Eur/h</td>
            <td>1 Eur/h</td>
            <td>2 Eur/h</td>
          </tr>
          <tr>
            <td>Friday {"(8am-8pm)"}</td>
            <td>1.5 Eur/h</td>
            <td>2 Eur/h</td>
            <td>3.5 Eur/h</td>
          </tr>
          <tr>
            <td>Saturday {"(Whole day)"}</td>
            <td>2 Eur/h</td>
            <td>4 Eur/h</td>
            <td>5 Eur/h</td>
          </tr>
          <tr>
            <td>Sunday {"(Whole day)"}</td>
            <td>Free</td>
            <td>Free</td>
            <td>Free</td>
          </tr>
        </table>
      </div>
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
