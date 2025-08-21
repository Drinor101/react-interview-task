import React, { useState, useCallback } from 'react';
import './EditItemModal.css';
import { EditItemModalProps, EditItemFormData, JobSiteCategory } from '../types';

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<EditItemFormData>({
    item: item.item,
    quantity: item.quantity,
    description: item.description,
    notes: item.notes
  });

  const handleInputChange = useCallback((field: keyof EditItemFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      ...formData
    });
  }, [item, formData, onSave]);

  const renderFormField = (
    field: keyof EditItemFormData,
    label: string,
    type: string,
    placeholder: string,
    required: boolean = false,
    rows?: number
  ) => {
    const commonProps = {
      id: field,
      placeholder,
      value: formData[field],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(field, type === 'number' ? parseInt(e.target.value) || 0 : e.target.value),
      required
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows || 3}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
        min={type === 'number' ? 0 : undefined}
      />
    );
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
                {renderFormField('item', 'Item', 'text', 'Search & Select Item', true)}
                <span className="dropdown-arrow">▼</span>
              </div>
              
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                {renderFormField('quantity', 'Quantity', 'number', 'Set Quantity', true)}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              {renderFormField('description', 'Description', 'textarea', 'Type the description....', true, 3)}
            </div>

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              {renderFormField('notes', 'Notes', 'textarea', 'Type a note...', false, 3)}
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
