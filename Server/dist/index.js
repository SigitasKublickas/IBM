import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.post("/image", (req, res) => {
    console.log(req.body);
    return res.send("hello11dasdas");
});
app.listen(8000, () => {
    console.log("Server started on port 8000");
});
// let image_path = "./plate.jpg";
// let body = new FormData();
// body.append("upload", fs.createReadStream(image_path));
// // Or body.append('upload', base64Image);
// body.append("regions", "us-ca"); // Change to your country
// fetch("https://api.platerecognizer.com/v1/plate-reader/", {
//   method: "POST",
//   headers: {
//     Authorization: "Token b52d5f066ed36e2b5738a3acce666d9df869650f",
//   },
//   body: body,
// })
//   .then((res: any) => res.json())
//   .then((json: any) => console.log({ ciaacacas: json.results }))
//   .catch((err) => {
//     console.log(err);
//   });
