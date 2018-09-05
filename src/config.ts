import { FetchAdapter } from './fetch-adapter';

type Adapters = FetchAdapter;

enum INTERCEPTOR {
  SUCCESS,
  FAIL
}
type Interceptor = (type: INTERCEPTOR, cb: (a: any) => any) => void;

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface Config {
  baseUrl: string;
  method: RequestMethod;
  body: any;
  adapter: new () => Adapters;
  interceptors: Interceptor[];
}

interface Adapter<T, V = any> {
  // A general request function
  request: (config: Config) => T;
  // How to map the request
  map: (req: T, cb: (a: V) => V) => T;
  error?: (req: T, cb: () => Error) => T;
}
