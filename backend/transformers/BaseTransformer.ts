/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseTransformer<M, T> {
  public getDefault(): T {
    return null;
  }
  public static collection(data: any[]) {
    const instance = new this();
    return instance.getCollection(data);
  }
  public getJSON(data: M = null): T {
    if (!data) return this.getDefault();
    return this.transform(data);
  }
  public transform(_: M): T {
    return null;
  }
  public getCollection(data: M[] = null): T[] {
    if (!data) return [];
    return data.map(item => this.getJSON(item));
  }
}
