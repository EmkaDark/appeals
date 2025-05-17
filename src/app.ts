import dotenv from "dotenv";
import express, { Application } from "express";
import { AppDataSource } from "./data-source";
import router from "./routes/routes";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", router);
app.get("/", (req, res) => {
  res.json({ message: "i's work" });
});

function start() {
  try {
    AppDataSource.initialize()
      .then(() => console.log("bd connected"))
      .catch((err) => console.log("db connecting error", err));

    app.listen(PORT, () => {
      console.log(`[server] -- listening in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
