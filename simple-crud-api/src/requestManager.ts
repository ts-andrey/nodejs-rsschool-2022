import { createServer } from 'http';
import { parse } from 'url';
import { v4 as uuid, validate } from 'uuid';

import { createUser, getAllUsers, getUser, updateUser, deleteUser } from './crud';
import { badRequest } from './error';

const URL_ROOT = '/api/users';
const URL_ROOT_SLASH = '/api/users/';

export function runManager() {
  const server = createServer((req, resp) => {
    const url: string = <string>req.url;

    const urlPath = parse(url, true).pathname;
    const urlQuery = parse(url, true).query;
    const urlSearch = parse(url, true).search;

    console.log(req.method, req.url, urlPath, urlSearch, urlQuery.userId);

    if (urlPath === URL_ROOT || urlPath === URL_ROOT_SLASH) {
      const userId = validate(<string>urlQuery.userId);

      if (req.method === 'GET') {
        if (urlQuery.userId && userId) {
          resp.statusCode = 200;
          resp.setHeader('Content-Type', 'json');
          resp.write(JSON.stringify('get single user'));
          resp.write(JSON.stringify(urlQuery));
        } else if (!urlSearch) {
          resp.statusCode = 200;
          resp.setHeader('Content-Type', 'json');
          resp.write(JSON.stringify(getAllUsers()));
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'POST') {
        if (!urlSearch) {
          resp.statusCode = 200;
          resp.setHeader('Content-Type', 'json');
          resp.write(JSON.stringify('post user'));
        } else {
          badRequest(resp, 'No query parameters allowed!');
        }
      } else if (req.method === 'PUT') {
        if (urlQuery.userId) {
          resp.statusCode = 200;
          resp.setHeader('Content-Type', 'json');
          resp.write(JSON.stringify('update user'));
          console.log(123);
          //
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      } else if (req.method === 'DELETE') {
        if (urlQuery.userId) {
          resp.statusCode = 200;
          resp.write(JSON.stringify('delete user'));
        } else {
          badRequest(resp, "Wrong query parameter or it's invalid!");
        }
      }
      //
    } else {
      badRequest(resp, 'Wrong path!');
    }
    resp.end();
  });

  server.listen(8080);
}
