import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

/**
 * Query parameters: URL stateful -> Filtros, paginação, não-obrigatórios 
 *  --> http://localhost:3333/users?name=Andre&userId=123
 * 
 * Route parameters: Identifiação de recurso:
 *    GET http://localhost:3333/users/1 
 *    DELETE http://localhost:3333/users/1 
 * 
 * Request body: Envio de informações via formulário (HTTPs)
 * 
 * 
*/

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  
  await json(request, response)

  const route = routes.find(route => route.method === method && route.path.test(url));
  if(route) {
    const routeParams = request.url.match(route.path)
    console.log(routeParams)
    return route.handle(request, response)
  }

  response.writeHead(404).end("Rota não encontrada!");
});

server.listen(3333);
