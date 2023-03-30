import express, { Request, Response } from "express";

import * as dotenv from "dotenv";
dotenv.config();

import userRoutes from "./src/routes/user.route";
import serverGrpcService from "./src/services/serverGrpcService";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);

// gRPC testing
app.get("/ping", async (req: Request, res: Response) => {
  let clientRes = {};
  try {
    clientRes = await serverGrpcService.ping({});
  } catch (err: any) {
    console.error(err.message);
    clientRes = err.message;
  }
  res.json(clientRes);
});

app.get("/", (_req, res) => {
  res.send({ res: "Welcome to gateway😊" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is listening on localhost:${process.env.PORT}`);
});
