import express from "express";
import { startGRPCServer } from "./src/util/grpc";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

startGRPCServer();

app.get("/", (_req, res) => {
  res.send({ res: "user service running successfully." });
});

// Define the port to run the server. this could either be defined
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening on localhost:${process.env.PORT}`);
});
