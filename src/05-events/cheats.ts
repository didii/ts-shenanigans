type Type<T> = {
  new(...args: any[]): T;
};

type Listener<T> = {
  type: Type<T>;
  callback: (event: T) => void;
};
type Provider<T> = {
  type: Type<T>;
  provider: (request: T) => Promise<any>;
};

class EventHub {
  private listeners: Listener<any>[] = [];
  private providers: Provider<any>[] = [];

  public addListener<T extends object>(type: Type<T>, callback: (event: T) => void) {
    this.listeners.push({ type, callback });
  }
  public addProvider<T>(type: Type<T>, provider: (request: T) => Promise<any>) {
    this.providers.push({ type, provider });
  }

  public emit<T extends object>(event: T) {
    for (const listener of this.listeners) {
      if (event.constructor !== listener.type) continue;
      listener.callback(event);
    }
  }
  public request<T extends object>(request: T) {
    for (const provider of this.providers) {
      if (provider.type !== request.constructor) continue;
      return provider.provider(request);
    }
  }

}

class LogEvent {
  public constructor(public msg: string) { }
}
class RequestConfirm {
}

const hub = new EventHub();
hub.addListener(LogEvent, (event) => console.log('[LogEvent]', event.msg));
hub.addProvider(RequestConfirm, (req) => new Promise<void>((resolve, reject) => setTimeout(() => reject(), 1000)));

hub.emit(new LogEvent('alisudfghlias hfliausg flyasbbdfl asdghf'));
hub.request(new RequestConfirm())
  ?.then(() => console.log('Accepted'))
  .catch(() => console.log('DENIED, SIT DOWN!'));

export { };
