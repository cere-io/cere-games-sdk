export type WalletContext = {
  isReady: boolean;
  connecting: boolean;
  address?: string;
  balance?: number;
  isNewUser?: boolean;
};

export type ConfigContext = {
  sessionPrice: number;
  newWalletReward: number;
  gamePortalUrl: string;
};

export type ContextState = {
  config: ConfigContext;
  wallet: WalletContext;
};

export type Context = ContextState & {
  readonly subscribe: (handler: () => void) => () => void;
};

const defaultState: ContextState = {
  config: {
    sessionPrice: 0,
    newWalletReward: 0,
    gamePortalUrl: '',
  },

  wallet: {
    connecting: false,
    isReady: false,
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

export const createContext = (initState: Partial<ContextState> = {}): Context => {
  const events = new EventTarget();
  const context: Context = {
    subscribe: (handler) => {
      events.addEventListener('change', handler);

      return () => events.removeEventListener('change', handler);
    },

    ...defaultState,
    ...initState,
  };

  return createProxy(context, () => {
    events.dispatchEvent(new Event('change'));
  });
};
