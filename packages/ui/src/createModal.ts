export type Modal = {
  readonly isOpen: boolean;
  open: () => void;
  close: () => void;
};

function appendToBody(element: HTMLElement) {
  if (document.body) {
    document.body.appendChild(element);
  } else {
    requestAnimationFrame(() => appendToBody(element));
  }
}

export const createModal = (contentElement: HTMLElement): Modal => {
  const modal = document.createElement('cere-modal');
  modal.appendChild(contentElement);

  return {
    get isOpen() {
      return modal.isConnected;
    },

    open: () => appendToBody(modal),
    close: () => modal.remove(),
  };
};
