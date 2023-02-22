import { useContext, useEffect, useRef, useState } from 'react';

import { Context } from '../createContext';
import { WidgetContext } from '../createWidget';

type Selector<T> = (context: Context) => T;

export const useWidgetContext = <T>(selector: Selector<T>) => {
  const selectorRef = useRef<Selector<T>>(selector);
  const [state, setState] = useState<T>();
  const context = useContext(WidgetContext);

  selectorRef.current = selector;

  if (!context) {
    throw new Error('Not in a widget context');
  }

  useEffect(() => context.subscribe(() => setState(selectorRef.current(context))), [context]);

  return state || selectorRef.current(context);
};
