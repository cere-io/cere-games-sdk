import { Context } from './createContext';
import { createWidget } from './createWidget';
import { registerWidget } from './registerWidget';
import { Leaderboard, Preloader, Modal, ConnectWallet } from './widgets';

export const register = async (context: Context) => {
  registerWidget('cere-preloader', createWidget(Preloader));
  registerWidget('cere-leaderboard', createWidget(Leaderboard));
  registerWidget('cere-modal', createWidget(Modal));
  registerWidget('cere-connect-wallet', createWidget(ConnectWallet, context));
};

export * from './createModal';
export * from './createContext';

export type { Widget } from './types';
