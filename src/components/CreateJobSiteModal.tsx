import React, { useState, useCallback } from 'react';
import './CreateJobSiteModal.css';
import { CreateJobSiteModalProps, CreateJobSiteFormData, JobSiteCategory, JobSiteStatus } from '../types';
import { AVAILABLE_CATEGORIES, AVAILABLE_STATUSES } from '../utils/constants';
import { isFormValid } from '../utils/helpers';

const CreateJobSiteModal: React.FC<CreateJobSiteModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<CreateJobSiteFormData>({
    name: '',
    categories: [],
    status: ''
  });

  const handleCategoryToggle = useCallback((category: JobSiteCategory) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  }, []);

  const handleInputChange = useCallback((field: keyof CreateJobSiteFormData, value: string | JobSiteCategory[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid(formData)) {
      onSave(formData);
    }
  }, [formData, onSave]);

  const renderCategoryOption = (category: JobSiteCategory) => (
    <div
      key={category}
      className={`category-option ${
        formData.categories.includes(category) ? 'selected' : ''
      }`}
      onClick={() => handleCategoryToggle(category)}
    >
      <span>{category}</span>
      {formData.categories.includes(category) && (
        <span className="checkmark">✓</span>
      )}
    </div>
  );

  const renderStatusOption = (status: JobSiteStatus) => (
    <option key={status} value={status}>
      {status}
    </option>
  );

  return (
    <div className="modal-overlay">
      <div className="modal">
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
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Type the jobsite's name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categories">Category Included</label>
              <div className="categories-container">
                {AVAILABLE_CATEGORIES.map(renderCategoryOption)}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as JobSiteStatus)}
                required
              >
                <option value="">Select one</option>
                {AVAILABLE_STATUSES.map(renderStatusOption)}
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                <span className="cancel-icon">×</span>
                Cancel Changes
              </button>
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

export default CreateJobSiteModal;
