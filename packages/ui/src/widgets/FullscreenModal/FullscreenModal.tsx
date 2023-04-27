import { useEffect } from 'react';

import { useDomEvents } from '../../hooks';
import { FullscreenModal as UIFullscreenModal, FullscreenModalProps as UIFullscreenModalProps } from '../../components';

export type FullscreenModalProps = Omit<UIFullscreenModalProps, 'children'>;

export const FullscreenModal = (props: FullscreenModalProps) => {
  const domEvents = useDomEvents();

  useEffect(() => {
    domEvents.suspend();

    return () => domEvents.resume();
  }, [domEvents]);

  return <UIFullscreenModal {...props} />;
};
