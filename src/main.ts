import express from "express";
import router from "./routes/index.routes";
import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./database/sources/postgres";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
