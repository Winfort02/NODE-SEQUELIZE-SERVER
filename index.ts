import express from "express";
import cors from "cors";
import db from "./models";
import dotenv from "dotenv";
import router from "./routes/user-routes";
import cryto from "crypto";
dotenv.config();

// create instance of express
const app = express();
const options = {
  origin: `http://localhost:3000`,
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

// router testing
app.use(router);

// server testing
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("Serving running on port " + port);
      // process.env.TOKEN_SECRET_KEY = cryto.randomBytes(32).toString("hex");
    });
  })
  .catch((e: ErrorCallback) => console.log(e));
