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
  const [record, setRecord] = useState<{
    success: boolean;
    id: string;
    direction: string;
  }>();
  const { createVehicleRecord, getCostById } = useMemo(
    () => api(axios),
    [axios]
  );
  const handleImageChange = (file: FileReaderType) => {
    createVehicleRecord(file)
      .then(
        (res: {
          data: {
            success: boolean;
            id: string;
            direction: string;
            msg: string;
          };
        }) => {
          if (res.data.success) {
            if (res.data.direction === "Exit") {
              setRecord(res.data);
            } else {
              setExpand(true);
              setMsg("Welcome to the parking lot!!!");
            }
          } else {
            alert(`${res.data.msg}`);
          }
        }
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPriceAndTime();
  }, [record]);

  const getPriceAndTime = () => {
    if (record) {
      getCostById(record.id).then(
        (res: {
          data: { success: boolean; cost: number; spentTime: string };
        }) => {
          if (res.data.success) {
            setMsg(
              `GoodBye! \n Spent time: ${res.data.spentTime} \n Amount: ${res.data.cost}€`
            );
            setExpand(true);
          }
        }
      );
    }
  };
  return (
    <div className="App">
      <ImgInput onImageUploaded={handleImageChange} />
      <Rates />
      {expand && (
        <Alert
          text={msg}
          click={() => {
            setRecord(undefined);
            setExpand(false);
            setMsg("");
          }}
        />
      )}
    </div>
  );
}

export default App;
