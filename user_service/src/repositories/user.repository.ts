import elasticClient from "../config/elastic.config";
import { IUser } from "../interfaces/user.interface";

const USER_INDEX = "users";

const getUsers = async () => {
  const result = await elasticClient.search<IUser>({
    index: USER_INDEX,
    query: {
      match_all: {},
    },
  });
  const users = result.hits.hits.map((user) => {
    return { id: user._id, ...user._source };
  });
  return users;
};

const getUser = async (id: string) => {
  const result = await elasticClient.get<IUser>({
    index: USER_INDEX,
    id: id,
  });
  return { ...result._source, id };
};

const createUser = async (data: any) => {
  const saveData = await elasticClient.index({
    index: USER_INDEX,
    refresh: true,
    document: data,
  });

  return { ...data, id: saveData._id };
};

const updateUser = async (id: string, data: any) => {
  await elasticClient.update({
    index: USER_INDEX,
    id: id,
    doc: data,
    refresh: true,
  });

  return await getUser(id);
};

const deleteUser = async (id: string) => {
  await elasticClient.delete({
    index: USER_INDEX,
    id: id,
    refresh: true,
  });
  return await getUser(id);
};

export default {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
