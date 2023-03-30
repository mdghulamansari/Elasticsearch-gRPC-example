import { ISetResponseData, IUser } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";

class UserService {
  private responseData: ISetResponseData;

  private setResponseData() {
    this.responseData = {
      error: null,
      data: null,
    };
  }

  ping = async (data: any, callback: any) => {
    this.setResponseData();
    callback(null, { message: "success" });
  };

  getUsers = async (data: any, callback: any) => {
    this.setResponseData();
    this.responseData.data = await userRepository.getUsers();
    callback(null, this.responseData);
  };

  getUser = async (data: any, callback: any) => {
    this.setResponseData();
    const { id } = data.request;
    this.responseData.data = await userRepository.getUser(id);
    callback(null, this.responseData);
  };

  createUser = async (data: any, callback: any) => {
    this.setResponseData();
    const user = data.request;
    this.responseData.data = await userRepository.createUser(user);
    callback(null, this.responseData);
  };

  updateUser = async (data: any, callback: any) => {
    this.setResponseData();
    const { id, ...updateData } = data.request;
    console.log(id);
    console.log(updateData);

    this.responseData.data = await userRepository.updateUser(id, updateData);
    callback(null, this.responseData);
  };

  deleteUser = async (data: any, callback: any) => {
    this.setResponseData();
    const { id } = data.request;
    this.responseData.data = await userRepository.deleteUser(id);
    callback(null, this.responseData);
  };
}

export default new UserService();
