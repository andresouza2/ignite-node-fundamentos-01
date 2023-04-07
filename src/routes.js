import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handle: (request, response) => {
      const users = database.select('users')

      return response.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: '/users',
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
  }
]