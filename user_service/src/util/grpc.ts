import * as dotenv from "dotenv";
dotenv.config();

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

import UserService from "../services/user.service";

export const startGRPCServer = async () => {
  const packageDefinition = protoLoader.loadSync("proto/user.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  });

  const userProto: any = grpc.loadPackageDefinition(packageDefinition);
  const server = new grpc.Server();

  server.addService(userProto.UserService.service, {
    ping: (node: any, callback: any) => {
      callback(null, { message: "done" });
    },
    getUsers: UserService.getUsers,
    getUser: UserService.getUser,
    createUser: UserService.createUser,
    updateUser: UserService.updateUser,
    deleteUser: UserService.deleteUser,
  });

  await server.bindAsync(
    process.env.GRPC_URL,
    grpc.ServerCredentials.createInsecure(),
    (error: any, port: number) => {
      server.start();
      console.log(`gRPC Server is listening on localhost:${port}`);
    }
  );
};
