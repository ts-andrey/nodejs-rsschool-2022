import { IUserData } from './IUser';
import { createServer } from 'http';
import { parse } from 'url';
import { validate } from 'uuid';

import { createUser, getAllUsers, getUser, updateUser, deleteUser } from './crud';
import { badRequest } from './error';

const URL_ROOT = '/api/users';

export function runManager() {
  const server = createServer((req, resp) => {
    const url: string = <string>req.url;

    const urlPath = parse(url, true).pathname;
    const urlQuery = parse(url, true).query;
    const urlSearch = parse(url, true).search;

    console.log(req.method, req.url, urlPath, urlSearch, urlQuery.userId);

    if (urlPath === URL_ROOT || urlPath === `${URL_ROOT}/`) {
      const userId = validate(<string>urlQuery.userId);

      if (req.method === 'GET') {
        if (urlQuery.userId && userId) {
          resp.writeHead(200, { 'Content-Type': 'json' });
          resp.write(JSON.stringify({ data: getUser(<string>urlQuery.userId) }));
        } else if (!urlSearch) {
          resp.writeHead(200, { 'Content-Type': 'json' });
          resp.write(JSON.stringify({ data: getAllUsers() }));
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'POST') {
        if (!urlSearch) {
          let userData: IUserData;
          req.setEncoding('utf8');
          req.on('data', chunk => {
            userData = JSON.parse(chunk);
            console.log(chunk);
          });
          req.on('end', () => {
            resp.writeHead(200, { 'Content-Type': 'json' });
            resp.write(JSON.stringify('post user'));
            resp.write(JSON.stringify({ data: createUser(userData) }));
          });
        } else {
          badRequest(resp, 'No query parameters allowed!');
        }
      } else if (req.method === 'PUT') {
        if (userId) {
          let userInfo: IUserData;
          req.setEncoding('utf8');
          req.on('data', chunk => {
            userInfo = JSON.parse(chunk);
            console.log(chunk);
          });
          req.on('end', () => {
            resp.writeHead(200, { 'Content-Type': 'json' });
            resp.write(JSON.stringify('update user'));
            resp.write(JSON.stringify({ data: updateUser(<string>urlQuery.userId, userInfo) }));
          });
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'DELETE') {
        if (userId) {
          resp.writeHead(200, {});
          deleteUser(<string>urlQuery.userId);
          resp.write(JSON.stringify('delete user'));
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      }
    } else {
      badRequest(resp, 'Wrong path!');
    }
    resp.end();
  });

  server.listen(8080);
}
