import * as widgets from './widgets';
import { createElement, registerElement } from './elements';

const Preloader = createElement(widgets.Preloader);
const Leaderboard = createElement(widgets.Leaderboard);
const Modal = createElement(widgets.Modal);

export const register = () => {
  registerElement('cere-preloader', Preloader);
  registerElement('cere-leaderboard', Leaderboard);
  registerElement('cere-modal', Modal);
};
