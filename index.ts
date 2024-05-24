import db from "./models";
import dotenv from "dotenv";
import app from "./routes/index-routes";
import crypto from "crypto";
dotenv.config();

dotenv.config();

const port = process.env.PORT || 8080;

// server testing
db.sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log("Serving running on port " + port);
			// process.env.TOKEN_SECRET_KEY = crypto.randomBytes(32).toString("hex");
		});
	})
	.catch((e: ErrorCallback) => console.log(e));
