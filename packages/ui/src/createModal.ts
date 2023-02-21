export type Modal = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
};

export type ModalOptions = {
  hasClose?: boolean;
};

function appendToBody(element: HTMLElement) {
  if (document.body) {
    document.body.appendChild(element);
  } else {
    requestAnimationFrame(() => appendToBody(element));
  }
}

export const createModal = (contentElement: HTMLElement, options: ModalOptions = {}): Modal => {
  const modal = document.createElement('cere-modal');

  if (options.hasClose) {
    modal.update({
      hasClose: true,
      onRequestClose: () => modal.remove(),
    });
  }

  modal.appendChild(contentElement);

  return {
    get isOpen() {
      return modal.isConnected;
    },

    open: () => appendToBody(modal),
    close: () => modal.remove(),
  };
};
