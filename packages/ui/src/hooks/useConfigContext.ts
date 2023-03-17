import { useWidgetContext } from './useWidgetContext';

export const useConfigContext = () => {
  return useWidgetContext((context) => context.config);
};
