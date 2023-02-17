import { createElement, registerElement } from './elements';
import { Leaderboard, Preloader, Modal } from './widgets';

export const register = () => {
  registerElement('cere-preloader', createElement(Preloader));
  registerElement('cere-leaderboard', createElement(Leaderboard));
  registerElement('cere-modal', createElement(Modal));
};

export type { Widget } from './types';
