type Type<T> = { new(...args: any[]): T };

class Container {
  private services: object[] = [];

  public getService<T>(service: Type<T>, optional?: false): T;
  public getService<T>(service: Type<T>, optional: boolean): T | undefined;
  public getService<T>(service: Type<T>, optional: boolean = false): T | undefined {
    const found = this.services.find(s => s.constructor === service) as T | undefined;
    if (!optional && found == null) {
      throw Error('Service not found');
    }

    return found;
  }

}

class HttpService {
  public get(route: string): Promise<Response> {
    return fetch(route);
  }
}

async function main(isOptional: boolean) {
  const container = new Container();
  const httpService = container.getService(HttpService);
  const response = await httpService.get('')
  const json = await response.json();
}


export { };
