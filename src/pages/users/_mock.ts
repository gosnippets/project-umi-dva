import { User } from './types';

let users: User[] = [
  {
    id: 0,
    name: 'RDG',
    age:27,
    contact:9340172104,
    creationTimestamp: new Date()
  },
  {
    id: 1,
    name: 'Maya',
    age:27,
    contact:9340172104,
    creationTimestamp: new Date()
  }
];

let usersList: User[] = [
  {
    id: 0,
    name: 'RDG',
    age:27,
    contact:9340172104,
    creationTimestamp: new Date()
  },
  {
    id: 1,
    name: 'Maya',
    age:27,
    contact:9340172104,
    creationTimestamp: new Date()
  }
];

export default {
  'GET /api/users': (req, res) => {
    users=usersList;
    return res.json(usersList);
  },
  'POST /api/users': (req, res) => {
    const { body } = req;
    users.push({
      ...body,
      id: users.length,
      createdTimestamp: new Date(),
    });
    res.json(users);
  },
  'DELETE /api/users/:id': (req, res) => {
    users = users.filter(item => item.id != req.params.id);
    return res.json(users);
  },
  'PUT /api/users/:id': (req, res) => {
    const { body } = req;
    users.forEach((item, i) => {
      if (item.id == req.params.id) {
        users[i] = { ...item, ...body };
      }
    });
    return res.json(users);
  },
};
