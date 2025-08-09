import 'dotenv/config';
import express from "express";
import cors from "cors";
import usersRouter from "./routes/auth.js";
import bodyparser from 'body-parser'
import connectDB from './db/dbclient.js';
import cookieParser from "cookie-parser";
import reportRouter from "./routes/report.js"
import adminRouter from "./routes/admin.js"

connectDB();
const app = express();
const corsOptions = {
  origin: [
    "https://securebharat.vercel.app",
    "https://securebharat.info"
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(cookieParser());

app.use("/api/auth", usersRouter);
app.use("/api/reports", reportRouter);
app.use("/api/admin", adminRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
