type Type<T> = { new(...args: any[]): T };

interface RegisteredService<T> {
  type: Type<T>;
  factory?: () => T;
  value?: T;
}

class Container {
  private services: RegisteredService<any>[] = [];

  public register<T>(type: Type<T>): void;
  public register<T>(type: Type<T>, factory: () => T): void;
  public register<T>(value: T): void;
  public register<T>(type: Type<T> | T, factory?: () => T): void {
    //this.services.push({ type });
  }

  public registerType<T>(type: Type<T>): void { }
  public registerFactory<T>(type: Type<T>, factory: () => T): void { }
  public registerValue<T>(value: T): void { }

  public getService<T>(service: Type<T>, optional?: false): T;
  public getService<T>(service: Type<T>, optional: boolean): T | undefined;
  public getService<T>(service: Type<T> | Type<T>[], optional: boolean = false): T | undefined {
    const found: RegisteredService<T> | undefined = this.services.find(s => s.constructor === service);
    if (found == null) {
      if (!optional) {
        throw Error('Service not found');
      }
      return undefined;
    }

    if (found.value) return found.value;
    if (found.factory) return found.factory();
    return new found.type();
  }

}

class HttpService {
  public get(route: string): Promise<Response> {
    return fetch(route);
  }
}

async function main(isOptional: boolean) {
  const container = new Container();
  container.register(HttpService);
  const httpService = container.getService(HttpService);
  const response = await httpService.get('')
  const json = await response.json();
}



// ---------------------------------------------------------------------------------------------

const location = { href: '' };

type Routes =
  | [name: 'pokemon', params: { id: number }]
  | [name: 'moves', params: { id: number }]
  | [name: 'pokemon-moves', params: { pokemonId: number; moveId?: number }]
  | [name: 'pokemon-evolutions', params: { pokemonId: number }]


class Navigation {
  public navigate(...args: Routes) {
    const [name, params] = args;

    let route: string;
    switch (name) {
      case 'pokemon':
        route = `/pokemons/${params.id}`;
        break;
      case 'moves':
        route = `/moves/${params.id}`;
        break;
      case 'pokemon-moves':
        route = `/pokemons/${params.pokemonId}/moves`;
        if (params.moveId) {
          route += `/${params.moveId}`;
        }
        break;
      case 'pokemon-evolutions':
        route = `/pokemons/${params.pokemonId}/evolutions`;
        break;
    }

    location.href = route;
    return route;
  }
}


const navigation = new Navigation();
console.log(navigation.navigate('pokemon', { id: 1 }));
console.log(navigation.navigate('pokemon-moves', { pokemonId: 1, moveId: 9 }));


export { };
