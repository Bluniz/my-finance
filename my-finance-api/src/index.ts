import express from "express";
import "dotenv/config";

import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
