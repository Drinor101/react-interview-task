import React, { useState } from 'react';
import './EditItemModal.css';

const EditItemModal = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    item: item.item,
    quantity: item.quantity,
    description: item.description,
    notes: item.notes
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...item,
      ...formData
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal edit-item-modal">
        <div className="modal-header">
          <h3>Title</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <p className="info-text">
            <span className="info-icon">ℹ</span>
            Informative piece of text that can be used regarding this modal.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  id="item"
                  placeholder="Search & Select Item"
                  value={formData.item}
                  onChange={(e) => setFormData(prev => ({ ...prev, item: e.target.value }))}
                  required
                />
                <span className="dropdown-arrow">▼</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Set Quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Type the description...."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                placeholder="Type a note..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="save-button">
                <span className="save-icon">✓</span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
