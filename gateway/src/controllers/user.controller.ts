import { Request, Response } from "express";
import serverGrpcService from "../services/serverGrpcService";

export const getUsers = async (req: Request, res: Response) => {
  let clientRes;
  try {
    clientRes = await serverGrpcService.getUsers({});
  } catch (err: any) {
    console.error(`ServerController-ping,  ${err}`);
    clientRes = err.message;
  }
  res.json(clientRes);
};

export const getUser = async (req: Request, res: Response) => {
  let clientRes;
  const { id } = req.params;

  try {
    clientRes = await serverGrpcService.getUser({ id });
  } catch (err: any) {
    console.error(`ServerController-ping,  ${err}`);
    clientRes = err.message;
  }
  res.json(clientRes);
};

export const createUser = async (req: Request, res: Response) => {
  let clientRes;
  try {
    clientRes = await serverGrpcService.createUser(req.body);
  } catch (err: any) {
    console.error(`ServerController-ping,  ${err}`);
    clientRes = err.message;
  }
  res.json(clientRes);
};

export const updateUser = async (req: Request, res: Response) => {
  let clientRes;
  try {
    const { id } = req.params;
    clientRes = await serverGrpcService.updateUser({ id, ...req.body });
  } catch (err: any) {
    console.error(`ServerController-ping,  ${err}`);
    clientRes = err.message;
  }
  res.json(clientRes);
};

export const deleteUser = async (req: Request, res: Response) => {
  let clientRes;
  try {
    const { id } = req.params;
    clientRes = await serverGrpcService.deleteUser({});
  } catch (err: any) {
    console.error(`ServerController-ping,  ${err}`);
    clientRes = err.message;
  }
  res.json(clientRes);
};
