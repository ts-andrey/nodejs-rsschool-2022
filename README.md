# nodejs-rsschool-2022
node.js course from Rolling Scopes School in may of 2022



## Simple CRUD API
### Set of rules
- the only allowed url is `{server root path}/api/users/` with or without `userId`(used to get a specific user for updating, getting or deleting operations) query parameter of `uuid.v4` type (the path should be similar to something like that:  `http://localhost:8080/api/users`; or with query parameter: `http://localhost:8080/api/users/?userId=37b30997-70b4-48c4-89d7-df52209a3026`);
- there is only four type of allowed requests: GET (get all users or a particular one), POST (create user), PUT (update particular user), DELETE (delete specific user)
- to `create` or `update` user the valid data must be provided of `JSON` type `{name:string, age:number, hobbies: string[]}` where all fields are required and should not be empty (except the hobbies array);
- provided `userId` must be valid, otherwise operation will fail and the descriptive message will be provided; 
- for any wrong request there will be provided a response with descriptive `message`;
- result data will be provided in `JSON` format in `data` property if successful, or in `JSON` format in `message` property if it fails for some reason.

### Request examples (to avoid confusion as much as possible):
- `GET` (all users): `http://localhost:8080/api/users`;
- `GET` (specific users): `http://localhost:8080/api/users/?userId=37b30997-70b4-48c4-89d7-df52209a3026`;
- `POST`: `http://localhost:8080/api/users` with valid body user data;
- `PUT`: `http://localhost:8080/api/users/?userId=37b30997-70b4-48c4-89d7-df52209a3026` with valid body user data;
- `DELETE`: `http://localhost:8080/api/users/?userId=37b30997-70b4-48c4-89d7-df52209a3026`;
