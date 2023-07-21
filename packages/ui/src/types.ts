import type {
  PreloaderProps,
  LeaderboardProps,
  ModalProps,
  EarnScreenProps,
  FullscreenModalProps,
  SignUpProps,
  InsertCoinProps,
} from './widgets';

export interface WidgetType<P = {}> extends HTMLElement {
  readonly props: P;

  update(props: Partial<P>): this;
}

export type WidgetMap = {
  'cere-leaderboard': WidgetType<LeaderboardProps>;
  'cere-preloader': WidgetType<PreloaderProps>;
  'cere-signup': WidgetType<SignUpProps>;
  'cere-insert-coin': WidgetType<InsertCoinProps>;
  'cere-modal': WidgetType<ModalProps>;
  'cere-fullscreen-modal': WidgetType<FullscreenModalProps>;
  'cere-earn-screen': WidgetType<EarnScreenProps>;
};

export type Widget<T extends keyof WidgetMap> = WidgetMap[T];

declare global {
  interface HTMLElementTagNameMap extends WidgetMap {}
}
