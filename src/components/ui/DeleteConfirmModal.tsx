"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import Button from "./Button";
import "@/style/DeleteConfirmModal.css";

interface DeleteConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmModal = ({
  show,
  onClose,
  onDelete,
  title = "Delete",
  message = "This action cannot be undone.",
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      className="delete-modal"
    >
      <div className="delete-content text-center p-4">
        {/* Icon */}
        <div className="delete-icon-wrapper mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="delete-icon"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>

        {/* Text */}
        <h4 className="delete-title">Are you sure?</h4>
        <p className="delete-message">{message}</p>

        {/* Buttons */}
        <div className="delete-actions">
          <button className="btn btn-light cancel-btn flex-fill" onClick={onClose}>
            Cancel
          </button>
          <Button contentSize="small" className="maiacare-button flex-fill" onClick={onDelete}>
            {title}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
