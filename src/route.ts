export interface Route {
  readonly _path: string[];
  //readonly path: string;
}
export class YartRoute implements Route {
  _path: string[] = [];
  path() {
    return '/' + this._path.join('/');
  }
  public append(part: string): this {
    this._path.push(part);
    return this;
  }
  public prepend(part: string): this {
    this._path.unshift(part);
    return this;
  }
}
