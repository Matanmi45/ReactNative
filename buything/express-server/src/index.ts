import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import path from "path";
import { ip, port } from "./utils/helper";

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "/images")));
//console.log(path.join(__dirname, "/images"));
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.get("/", (req, res) => {
  res.json({ alive: false, express: `http://${ip}:${port}` });
});

app.listen(5555, "0.0.0.0", () => {
  console.log(`Server is running on: http://${ip}:${port}`);
});

// app.listen(5555, () => {
//   console.log("Server running");
// });
