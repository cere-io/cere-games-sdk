import { FullscreenModal as UIFullscreenModal, FullscreenModalProps as UIFullscreenModalProps } from '../../components';

export type FullscreenModalProps = Omit<UIFullscreenModalProps, 'children'>;

export const FullscreenModal = (props: FullscreenModalProps) => <UIFullscreenModal {...props} />;
