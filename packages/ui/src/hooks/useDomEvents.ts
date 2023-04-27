import { useWidgetContext } from './useWidgetContext';

export const useDomEvents = () => {
  return useWidgetContext((context) => context.domEvents);
};
