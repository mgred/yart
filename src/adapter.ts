import { Config } from './config';

export type Adapters = FetchAdapter;

export interface Adapter<T, V = any> {
  // A general request function
  request: (config: Config) => T;
  // How to map the request
  map: (req: T, cb: (a: V) => V) => T;
  error?: (req: T, cb: () => Error) => T;
}

export class FetchAdapter implements Adapter<Promise<any>> {
  request(config: Config): Promise<any> {
    return fetch(<any>config);
  }
  map(req: Promise<any>, cb) {
    return req.then(cb);
  }
  error(req: Promise<Error>, cb) {
    return req.catch(cb);
  }
}
