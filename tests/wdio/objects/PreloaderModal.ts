import { Widget } from './Widget';

export class PreloaderModal extends Widget {
  get element() {
    return $('cere-modal cere-preloader');
  }

  get playNowButton() {
    return this.shadowRoot.findByRole$('button', { name: /Play Now/i });
  }
}
