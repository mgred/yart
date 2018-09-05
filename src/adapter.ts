import { Config } from './config';

export interface Adapter<T, V = any> {
  // A general request function
  request: (config: Config) => T;
  // How to map the request
  map: (req: T, cb: (a: V) => V) => T;
  error?: (req: T, cb: () => Error) => T;
}
