import { Config, RequestMethod } from './config';
import { YartParams } from './params';
import { YartRoute } from './route';

export class YartRequest implements YartRoute, YartParams {
  params: () => string;
  _params = {};
  path: () => string;
  _path = [''];
  baseUrl: string;
  prefix: string;
  param: () => this;
  append: (...args: string[]) => this;
  prepend: () => this;

  private globalConfig: Config;
  private localConfig: Config;
  private adapter;

  constructor(config: Config) {
    this.globalConfig = config;
    this.adapter = new config.adapter();
  }

  config(value: any) {
    this.localConfig = { ...this.localConfig, ...value };
    return this;
  }

  fire() {
    return this.adapter.request({ ...this.globalConfig, ...this.localConfig });
  }
}
