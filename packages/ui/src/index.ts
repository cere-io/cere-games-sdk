import { Context } from './createContext';
import { createWidget } from './createWidget';
import { registerWidget } from './registerWidget';
import { injectFonts, injectLocalFonts } from './injectFonts';
import { Leaderboard, Preloader, Modal, ConnectWallet, FullscreenModal } from './widgets';
import { preloadAssets } from './preloadAssets';

import { yapariSemiBold, yapariSemiBoldExpanded, yapariSemiBoldExtended, yapariSemiBoldWide } from './fonts'

export const register = async (context: Context) => {
  injectFonts();
  injectLocalFonts([
    {
      name: 'Yapari-SemiBold',
      src: yapariSemiBold
    },
    {
      name: 'Yapari-SemiBoldExpanded',
      src: yapariSemiBoldExpanded
    },
    {
      name: 'Yapari-SemiBoldExtended',
      src: yapariSemiBoldExtended
    },
    {
      name: 'Yapari-SemiBoldWide',
      src: yapariSemiBoldWide
    }
  ])
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
