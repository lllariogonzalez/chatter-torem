import { Modal } from 'react-bootstrap';
import { ConfirmDialogProps } from '../types/chat';

function ConfirmDialog(confirmDialogProps: ConfirmDialogProps) {
  const { title, text, isOpen, handleCancel, handleOk } = confirmDialogProps;

  const closeDialog = () => {
    handleCancel(false);
  };

  const handleConfirm = () => {
    handleOk();
    closeDialog();
  };

  return (
    <Modal className="text-chatter-black" show={isOpen} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center">{text}</Modal.Body>

      <Modal.Footer className="justify-content-center">
        <button className="btn btn-danger px-5" onClick={handleConfirm}>
          Si
        </button>
        <button className="btn btn-secondary px-5" onClick={closeDialog}>
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;
