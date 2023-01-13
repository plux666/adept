import React, { FC } from "react";
import { Button, Modal } from "semantic-ui-react";

const ConfirmModal: FC<{
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  msg?: string;
}> = ({ onClose, onCancel, onConfirm, msg }) => {
  return (
    <Modal open dimmer={"blurring"} onClose={onClose}>
      <Modal.Header>Подтвердите действие</Modal.Header>
      <Modal.Description>{msg}</Modal.Description>
      <Modal.Actions>
        <Button negative onClick={onCancel}>
          Отмена
        </Button>
        <Button positive onClick={onConfirm}>
          Подтвердить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;
