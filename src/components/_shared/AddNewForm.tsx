import React, { useMemo, useState } from "react";
import { Button, Form, Input, Modal } from "semantic-ui-react";

export type InitialData = {
  [key: string]: {
    label: string;
    value: string;
  };
};

export type Props<T extends InitialData> = {
  onSave: (data: T) => void;
  onClose: () => void;
  onCancel: () => void;
  initialData: T;
};

function AddNewForm<T extends InitialData>(
  props: Props<T>
): React.ReactElement {
  const [formData, setFormData] = useState(props.initialData);

  const handleSave = () => {
    props.onSave(formData);
  };

  // might be a little too much (it is), but I wanted to make it just for fun
  return (
    <Modal open dimmer={"blurring"} onClose={() => props.onClose()}>
      <Modal.Header>Новая компания</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group>
            {/* c: */}
            {Object.keys(formData).map((key) => (
              <Form.Input
                required
                label={formData[key].label}
                value={formData[key].value}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    [key]: {
                      label: formData[key].label,
                      value: e.target.value,
                    },
                  }))
                }
              />
            ))}
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => props.onCancel()}>
          Отмена
        </Button>
        <Button positive onClick={() => handleSave()}>
          Добавить
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AddNewForm;
