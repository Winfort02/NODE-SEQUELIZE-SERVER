import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./user-routes";
import policiesRouter from "./policies-routes";
import rolesRouter from "./roles-routes";

dotenv.config();

// create instance of express
const app = express();
const options = {
	origin: `http://localhost:3000`,
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router testing
app.use(userRouter);
app.use(policiesRouter);
app.use(rolesRouter);

export default app;
