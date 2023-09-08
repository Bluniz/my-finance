import express from "express";
import cors from "cors";
import "dotenv/config";

import { router } from "./routes";

// var corsOptions = {
//   origin: "http://example.com",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
