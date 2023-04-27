import { Context } from './createContext';
import { createWidget } from './createWidget';
import { registerWidget } from './registerWidget';
import { injectFonts } from './injectFonts';
import { Leaderboard, Preloader, Modal, ConnectWallet, FullscreenModal } from './widgets';
import { preloadAssets } from './preloadAssets';

export const register = async (context: Context) => {
  injectFonts();
  preloadAssets(context);

  registerWidget('cere-preloader', createWidget(Preloader, context));
  registerWidget('cere-leaderboard', createWidget(Leaderboard, context));
  registerWidget('cere-modal', createWidget(Modal, context));
  registerWidget('cere-fullscreen-modal', createWidget(FullscreenModal, context));
  registerWidget('cere-connect-wallet', createWidget(ConnectWallet, context));
};

export * from './createModal';
export * from './createContext';

export type { Widget } from './types';
