import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState<any>();
  const handleDataChange = (event: any) => {
    if (event.target.files) {
      axios
        .post("http://localhost:8000/image", {
          image: URL.createObjectURL(event.target.files[0]),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      setImage({
        data: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  console.log(image);
  return (
    <div className="App">
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleDataChange}
      />
    </div>
  );
}

export default App;
