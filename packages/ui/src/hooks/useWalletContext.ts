import { useWidgetContext } from './useWidgetContext';

export const useWalletContext = () => {
  return useWidgetContext((context) => context.address);
};
