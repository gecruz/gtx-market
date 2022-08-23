import { createServer, Response } from 'miragejs';

import { products } from "./app/shared/mocks/products";
import { environment } from './environments/environment';

const createBFFServer = (): any => createServer({
  routes(): void {
    this.urlPrefix = environment.services.api;

    this.get('products', (_, request) => new Response(200, request.requestHeaders, products))
  }
});

export default createBFFServer;