import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  
  await json(request, response)

  const route = routes.find(route => route.method === method && route.path === url);
  if(route)
    return route.handle(request, response)

  response.writeHead(404).end("Rota não encontrada!");
});

server.listen(3333);
