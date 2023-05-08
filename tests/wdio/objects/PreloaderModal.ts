import { Widget } from './Widget';

export class PreloaderModal extends Widget {
  get element() {
    return $('cere-modal cere-preloader');
  }

  get startButton() {
    return this.shadowRoot.findByTestId$('preloaderStart');
  }
}
