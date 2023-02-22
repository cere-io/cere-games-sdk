import { Modal as UIModal, ModalProps as UIModalProps } from '../../components';

export type ModalProps = Omit<UIModalProps, 'children'>;

export const Modal = (props: ModalProps) => <UIModal {...props} />;
