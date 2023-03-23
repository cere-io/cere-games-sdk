import { useWidgetContext } from './useWidgetContext';

export const useReporting = () => {
  return useWidgetContext((context) => context.reporting);
};
