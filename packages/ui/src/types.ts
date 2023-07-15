import type { PreloaderProps, LeaderboardProps, ModalProps, ConnectWalletProps, FullscreenModalProps } from './widgets';

export interface WidgetType<P = {}> extends HTMLElement {
  readonly props: P;
  update(props: Partial<P>): this;
}

export type WidgetMap = {
  'cere-leaderboard': WidgetType<LeaderboardProps>;
  'cere-preloader': WidgetType<PreloaderProps>;
  'cere-signup': WidgetType<PreloaderProps>;
  'cere-modal': WidgetType<ModalProps>;
  'cere-fullscreen-modal': WidgetType<FullscreenModalProps>;
  'cere-connect-wallet': WidgetType<ConnectWalletProps>;
};

export type Widget<T extends keyof WidgetMap> = WidgetMap[T];

declare global {
  interface HTMLElementTagNameMap extends WidgetMap {}
}
