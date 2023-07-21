import { Context } from './createContext';
import { createWidget } from './createWidget';
import { registerWidget } from './registerWidget';
import { injectFonts, injectLocalFonts } from './injectFonts';
import { Leaderboard, Preloader, Modal, EarnScreen, FullscreenModal, SignUp, InsertCoin } from './widgets';
import { preloadAssets } from './preloadAssets';

export const register = async (context: Context) => {
  injectFonts();
  injectLocalFonts(context.config.sdkUrl);
  preloadAssets(context);

  registerWidget('cere-preloader', createWidget(Preloader, context));
  registerWidget('cere-leaderboard', createWidget(Leaderboard, context));
  registerWidget('cere-modal', createWidget(Modal, context));
  registerWidget('cere-fullscreen-modal', createWidget(FullscreenModal, context));
  registerWidget('cere-earn-screen', createWidget(EarnScreen, context));
  registerWidget('cere-signup', createWidget(SignUp, context));
  registerWidget('cere-insert-coin', createWidget(InsertCoin, context));
};

export * from './createModal';
export * from './createContext';

export type { Widget } from './types';
