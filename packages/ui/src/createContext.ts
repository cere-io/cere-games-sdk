export type WalletContext = {
  loading: boolean;
  address?: string;
};

export type ContextState = {
  wallet: WalletContext;
};

export type Context = ContextState & {
  readonly subscribe: (handler: () => void) => () => void;
};

const defaultState: ContextState = {
  wallet: {
    loading: false,
  },
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

export const createContext = (initState = defaultState): Context => {
  const events = new EventTarget();
  const context: Context = {
    subscribe: (handler) => {
      events.addEventListener('change', handler);

      return () => events.removeEventListener('change', handler);
    },

    ...initState,
  };

  return createProxy(context, () => {
    events.dispatchEvent(new Event('change'));
  });
};
