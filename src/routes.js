import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handle: (request, response) => {
      const users = database.select('users')

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handle: (request, response) => {
      const {name, email} = request.body
    
      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return response.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handle: (request, response) => {
      return response.end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handle: (request, response) => {}
  },
]