type Type<T> = {
  new(...args: any[]): T;
};

type Listener<T> = {
  type: Type<T>;
  callback: (event: T) => void;
};

class BaseRequest<T> {
  __mock!: T;
}
type ResultOf<T extends BaseRequest<any>> = T extends BaseRequest<infer U> ? U : never;
type Provider<T extends BaseRequest<any>> = {
  type: Type<T>;
  provider: (request: T) => Promise<ResultOf<T>>;
};

class EventHub {
  private listeners: Listener<any>[] = [];
  private providers: Provider<any>[] = [];

  public addListener<T extends object>(type: Type<T>, callback: (event: T) => void) {
    this.listeners.push({ type, callback });
  }
  public addProvider<TResult>(type: Type<BaseRequest<TResult>>, provider: (request: BaseRequest<TResult>) => Promise<TResult>) {
    this.providers.push({ type, provider });
  }

  public emit<T extends object>(event: T) {
    for (const listener of this.listeners) {
      if (event.constructor !== listener.type) continue;
      listener.callback(event);
    }
  }
  public async request<TResult>(request: BaseRequest<TResult>): Promise<TResult> {
    for (const provider of this.providers) {
      if (provider.type !== request.constructor) continue;
      return await provider.provider(request) as TResult;
    }
    throw Error('No provider found');
  }

}

class LogEvent {
  public constructor(public msg: string) { }
}
class RequestConfirm extends BaseRequest<'confirm' | 'cancel'> {
}

const hub = new EventHub();
hub.addListener(LogEvent, (event) => console.log('[LogEvent]', event.msg));
hub.addProvider(RequestConfirm, (req) => new Promise<'confirm' | 'cancel'>((resolve, reject) => setTimeout(() => resolve('confirm'), 1000)));

hub.emit(new LogEvent('alisudfghlias hfliausg flyasbbdfl asdghf'));
hub.request(new RequestConfirm())
  .then((a) => console.log(a));

export { };
