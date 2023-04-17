import { useWidgetContext } from './useWidgetContext';

export const useGameInfo = () => {
  return useWidgetContext((context) => context.gameInfo);
};
