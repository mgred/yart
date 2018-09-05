import { Adapter } from './adapter';
import { Config } from './config';

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
