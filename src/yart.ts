import { Config } from './config';
import applyMixins from './mixin';
import { YartParams } from './params';
import { YartRequest } from './request';
import { YartRoute } from './route';

export class Yart {
  private request;
  constructor(private config: Config) {
    this.boot();
    this.initialize();
  }

  initialize() {
    applyMixins(YartRequest, [YartParams, YartRoute]);
    this.request = new YartRequest(this.config);
  }

  boot() {}

  delete(selector: string, body: any = null) {
    return this.request.config({ method: 'DELETE', body }).append(selector);
  }

  update(selector: string, body: any) {
    return this.request.config({ method: 'PUT', body }).append(selector);
  }

  find(selector: string) {
    return this.select(selector);
  }

  select(selector: string) {
    return this.request.config({ method: 'GET' }).append(selector);
  }
}
