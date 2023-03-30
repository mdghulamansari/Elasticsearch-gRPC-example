const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

import * as dotenv from "dotenv";
import { SERVER_METHODS } from "../constant/constant";
dotenv.config();

const packageDefinition = protoLoader.loadSync("proto/user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const metadata = new grpc.Metadata();
metadata.set("x-service", "client");

const client = new UserService(
  process.env.GRPC_URL,
  grpc.credentials.createInsecure()
);

class ServerGrpcService {
  private handleClientMethod = (request: any, method: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      client[method](request, metadata, (err: any, data: any) => {
        if (err || data.error) {
          console.log(err);
          reject(err ?? data.error);
        }
        resolve(data);
      });
    });
  };

  ping = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.PING);
  };

  getUsers = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.GET_USERS);
  };

  getUser = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.GET_USER);
  };

  createUser = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.CREATE_USER);
  };

  updateUser = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.UPDATE_USER);
  };

  deleteUser = (request: any): Promise<any> => {
    return this.handleClientMethod(request, SERVER_METHODS.DELETE_USER);
  };
}

const serverGrpcService = new ServerGrpcService();
export default serverGrpcService;
