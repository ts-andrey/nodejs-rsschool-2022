import { badRequest } from './error';
import { IUser, IUserData } from './IUser';
export const userCheck = (userInfo: IUserData) => {
  if (
    userInfo.name &&
    typeof userInfo.name === 'string' &&
    userInfo.age &&
    typeof userInfo.age === 'number' &&
    userInfo.hobbies &&
    typeof userInfo.hobbies === 'object'
  ) {
    return true;
  }
  return false;
};

export const getValidResponse = (data: IUser, code: number, resp: any) => {
  if (data) {
    resp.writeHead(code, { 'Content-Type': 'json' });
    resp.write(JSON.stringify({ data }));
  } else {
    badRequest(resp, 404, 'The operation is failed! No data was found for such a request.');
  }
};
