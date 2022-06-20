import { IUser, IUserData } from './IUser';
import { createServer } from 'http';
import { parse } from 'url';
import { validate } from 'uuid';

import { createUser, getAllUsers, getUser, updateUser, deleteUser } from './crud';
import { getValidResponse, userCheck } from './validator';
import { badRequest } from './error';

const URL_ROOT = '/api/users';

export function runManager() {
  const server = createServer((req, resp) => {
    const url: string = <string>req.url;

    const urlPath = parse(url, true).pathname;
    const urlQuery = parse(url, true).query;
    const urlSearch = parse(url, true).search;

    // console.log(req.method, req.url, urlPath, urlSearch, urlQuery.userId);

    if (urlPath === URL_ROOT || urlPath === `${URL_ROOT}/`) {
      const userId = validate(<string>urlQuery.userId);

      if (req.method === 'GET') {
        if (urlQuery.userId && userId) {
          const data = getUser(<string>urlQuery.userId);
          getValidResponse(data, 200, resp);
        } else if (!urlSearch) {
          resp.writeHead(200, { 'Content-Type': 'json' });
          resp.write(JSON.stringify({ data: getAllUsers() }));
        } else {
          badRequest(resp, 400, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'POST') {
        if (!urlSearch) {
          let userData: IUserData;
          let isUserInfoValid: boolean;

          req.setEncoding('utf8');
          req.on('data', chunk => {
            userData = JSON.parse(chunk);
            isUserInfoValid = userCheck(userData);
          });
          req.on('end', () => {
            if (isUserInfoValid) {
              resp.writeHead(201, { 'Content-Type': 'json' });
              resp.write(JSON.stringify({ data: createUser(userData) }));
            } else {
              badRequest(
                resp,
                400,
                'Provided user data is not valid! Please provide a valid data according to the documentation!'
              );
            }
          });
        } else {
          badRequest(resp, 400, 'No query parameters allowed!');
        }
      } else if (req.method === 'PUT') {
        if (userId) {
          let userInfo: IUserData;
          let isUserInfoValid: boolean;

          req.setEncoding('utf8');
          req.on('data', chunk => {
            userInfo = JSON.parse(chunk);
            isUserInfoValid = userCheck(userInfo);
          });
          req.on('end', () => {
            if (isUserInfoValid) {
              const data = updateUser(<string>urlQuery.userId, userInfo);
              getValidResponse(<IUser>data, 200, resp);
            } else {
              badRequest(
                resp,
                400,
                'Provided user data is not valid! Please provide a valid data according to the documentation!'
              );
            }
          });
        } else {
          badRequest(resp, 400, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'DELETE') {
        if (userId) {
          resp.write(JSON.stringify('delete user'));
          const result = deleteUser(<string>urlQuery.userId);
          getValidResponse(<IUser>result, 204, resp);
        } else {
          badRequest(resp, 400, "Wrong query parameter or it's invalid!");
        }
      }
    } else {
      badRequest(resp, 404, 'Wrong path!');
    }
    resp.end();
  });

  server.listen(8080);
}
