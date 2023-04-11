import { WidgetType } from './types';
import { FullscreenModalProps } from './widgets';

export type Modal = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type ModalOptions = {
  hasClose?: boolean;
};

export type FullScreenModalOptions = {
  hasClose?: boolean;
  isLeaderBoard?: boolean;
};

function appendToBody(element: HTMLElement) {
  if (document.body) {
    document.body.appendChild(element);
  } else {
    requestAnimationFrame(() => appendToBody(element));
  }
}

export const createModal = (
  contentElement: HTMLElement | (() => Promise<HTMLElement>),
  options: ModalOptions = {},
): Modal => {
  const modal = document.createElement('cere-modal');

  if (options.hasClose) {
    modal.update({
      hasClose: true,
      onRequestClose: () => modal.remove(),
    });
  }

  if (typeof contentElement === 'function') {
    modal.update({ loading: true });

    Promise.resolve(contentElement()).then((element) => {
      modal.appendChild(element);
      modal.update({ loading: false });
    });
  } else {
    modal.appendChild(contentElement);
  }

  return {
    get isOpen() {
      return modal.isConnected;
    },

    open: () => appendToBody(modal),
    close: () => modal.remove(),
  };
};

export const createFullscreenModal = (
  contentElement: HTMLElement | (() => Promise<HTMLElement>),
  options: FullScreenModalOptions = {},
): Modal => {
  const elementName = 'cere-fullscreen-modal';
  const modalInstance = document.querySelector(elementName);
  let modal: WidgetType<FullscreenModalProps>;
  if (!!modalInstance) {
    modal = modalInstance;
  } else {
    modal = document.createElement(elementName);
  }

  if (options.hasClose) {
    modal.update({
      hasClose: true,
      onRequestClose: () => modal.remove(),
    });
  }

  if (options.isLeaderBoard) {
    modal.update({
      isLeaderBoard: true,
    });
  }

  if (typeof contentElement === 'function') {
    modal.update({ loading: true });

    Promise.resolve(contentElement()).then((element) => {
      modal.replaceChildren();
      modal.appendChild(element);
      modal.update({ loading: false });
    });
  } else {
    modal.appendChild(contentElement);
  }

  return {
    get isOpen() {
      return modal.isConnected;
    },

    open: () => appendToBody(modal),
    close: () => modal.remove(),
  };
};
