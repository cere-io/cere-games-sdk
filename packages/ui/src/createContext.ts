export type Context = {
  readonly subscribe: (handler: () => void) => () => void;

  address?: string;
};

export const createProxy = (context: Context, onChange: () => void) => {
  const handler: ProxyHandler<Context> = {
    get(target: any, prop) {
      if (target[prop] && typeof target[prop] === 'object') {
        return new Proxy(target[prop], handler);
      }

      return target[prop];
    },

    set(target: any, prop, value) {
      target[prop] = value;

      onChange();

      return true;
    },
  };

  return new Proxy(context, handler);
};

export const createContext = (): Context => {
  const events = new EventTarget();
  const context: Context = {
    subscribe: (handler) => {
      events.addEventListener('change', handler);

      return () => events.removeEventListener('change', handler);
    },
  };

  return createProxy(context, () => {
    events.dispatchEvent(new Event('change'));
  });
};
