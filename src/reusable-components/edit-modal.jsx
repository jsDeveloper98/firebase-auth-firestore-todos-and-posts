import React from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({
  onChange,
  changedTitle,
  changedDescription,
  onHide,
  onEdit,
}) => {
  return (
    <div className="modal-bg">
      <Modal.Dialog className="edit-post-modal">
        <Modal.Header>
          <input
            type="text"
            className="edit-post-input"
            onChange={onChange}
            value={changedTitle}
            name="changedTitle"
            placeholder="Title"
            autoComplete="off"
            autoFocus="on"
          />
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            className="edit-post-input"
            onChange={onChange}
            value={changedDescription}
            name="changedDescription"
            placeholder="Description"
            autoComplete="off"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="close-edit-post-modal-btn"
            variant="secondary"
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className={disableBtn(changedTitle, changedDescription)}
            onClick={onEdit}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default EditModal;

const disableBtn = (changedTitle, changedDescription) => {
  let classes = "";
  classes += changedTitle && changedDescription ? "" : " -disabled";
  return classes;
};
