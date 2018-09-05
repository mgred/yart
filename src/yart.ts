import { Config } from './config';
import { YartRequest } from './request';

class Yart {
  private request;
  constructor(private config: Config) {
    this.boot();
    this.initialize();
  }

  initialize() {
    this.request = new YartRequest(this.config);
  }

  boot() {}

  delete(selectot: string, body: any = null) {
    return this.request.config({ method: 'DELETE', body });
  }

  update(selector: string, body: any) {
    return this.request.config({ method: 'PUT', body }).append(selector);
  }

  find(selector: string) {
    return this.request.select(selector);
  }

  select(selector: string) {
    return this.request.config({ method: 'GET' }).append(selector);
  }
}
