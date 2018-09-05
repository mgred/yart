export interface Params {
  readonly _params?: {
    [key: string]: any;
  };
}

export class YartParams implements Params {
  _params = {};
  get params() {
    return Object.keys(this._params)
      .map(key => {
        const value = encodeURIComponent(this._params[key]);
        return `${key}=${value}`;
      })
      .join('&');
  }
  public param(name: string, value: any): this {
    this._params[name] = value;
    return this;
  }
}
