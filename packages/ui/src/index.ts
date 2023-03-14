import { Context } from './createContext';
import { createWidget } from './createWidget';
import { registerWidget } from './registerWidget';
import { InjectFonts } from './injectFonts';
import { Leaderboard, Preloader, Modal, ConnectWallet, FullscreenModal } from './widgets';

export const register = async (context: Context) => {
  InjectFonts();
  registerWidget('cere-preloader', createWidget(Preloader, context));
  registerWidget('cere-leaderboard', createWidget(Leaderboard, context));
  registerWidget('cere-modal', createWidget(Modal, context));
  registerWidget('cere-fullscreen-modal', createWidget(FullscreenModal, context));
  registerWidget('cere-connect-wallet', createWidget(ConnectWallet, context));
};

export * from './createModal';
export * from './createContext';

export type { Widget } from './types';
