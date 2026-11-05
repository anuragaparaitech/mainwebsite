import React from 'react';
import { MdWarning } from 'react-icons/md';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <MdWarning />
        </div>
        <h3 className="modal-title">{title || 'Confirm Delete'}</h3>
        <p className="modal-message">
          {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
        </p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
