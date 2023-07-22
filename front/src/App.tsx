import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { Alert } from "./components/dialog";
import { api, APIURL } from "./api";
import { Rates } from "./components/rates";
import { FileReaderType, ImgInput } from "./components/imgInput";

function App() {
  const [expand, setExpand] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const { createVehicleRecord } = useMemo(() => api(axios), [axios]);

  const handleImageChange = (file: FileReaderType) => {
    createVehicleRecord(file)
      .then((res: any) => {
        setExpand(true);
        setMsg(res.data.msg);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <ImgInput onImageUploaded={handleImageChange} />
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
