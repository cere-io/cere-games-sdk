import { createElement, registerElement } from './elements';
import { Leaderboard, Preloader, Modal, ConnectWallet } from './widgets';

export const register = async () => {
  registerElement('cere-preloader', createElement(Preloader));
  registerElement('cere-leaderboard', createElement(Leaderboard));
  registerElement('cere-modal', createElement(Modal));
  registerElement('cere-connect-wallet', createElement(ConnectWallet));
};

export * from './createModal';
export type { Widget } from './types';
