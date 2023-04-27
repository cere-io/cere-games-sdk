import { useEffect } from 'react';

import { useDomEvents } from '../../hooks';
import { Modal as UIModal, ModalProps as UIModalProps } from '../../components';

export type ModalProps = Omit<UIModalProps, 'children'>;

export const Modal = (props: ModalProps) => {
  const domEvents = useDomEvents();

  useEffect(() => {
    domEvents.suspend();

    return () => domEvents.resume();
  }, [domEvents]);

  return <UIModal {...props} />;
};
