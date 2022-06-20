import { IUser, IUserData } from './IUser';
import { users } from './data';
import { v4 as uuid } from 'uuid';

export const createUser = (user: IUserData) => {
  const newUser: IUser = user;
  newUser.id = uuid();
  return users.push(newUser);
};

export const getAllUsers = () => {
  return users;
};

export const getUser = (userId: string) => {
  return users.filter(user => user.id === userId)[0];
};

export const updateUser = (userId: string, userInfo: IUserData) => {
  const updatedUser: IUser = userInfo;
  updatedUser.id = userId;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = updatedUser;
    return updatedUser;
  } else {
    return undefined;
  }
};

export const deleteUser = (userId: string) => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    return users.splice(userIndex, 1);
  } else {
    return undefined;
  }
};
