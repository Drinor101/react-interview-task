import React, { useState, useMemo } from 'react';
import './InventoryDashboard.css';
import EditItemModal from './EditItemModal';
import { InventoryDashboardProps, InventoryItem, JobSiteCategory } from '../types';
import { DEFAULT_INVENTORY_DATA } from '../utils/constants';
import { filterInventoryItems } from '../utils/helpers';

const InventoryDashboard: React.FC<InventoryDashboardProps> = ({ 
  jobSite, 
  onGoBack, 
  onUpdateJobSite 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<JobSiteCategory | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<(InventoryItem & { category: JobSiteCategory }) | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inventory, setInventory] = useState(() => DEFAULT_INVENTORY_DATA);

  const handleCategorySelect = (category: JobSiteCategory) => {
    setSelectedCategory(category);
  };

  const handleItemEdit = (item: InventoryItem, category: JobSiteCategory) => {
    setEditingItem({ ...item, category });
    setShowEditModal(true);
  };

  const handleItemUpdate = (updatedItem: InventoryItem & { category: JobSiteCategory }) => {
    // Update the inventory state
    setInventory(prevInventory => ({
      ...prevInventory,
      [updatedItem.category]: prevInventory[updatedItem.category].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
    
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = useMemo(() => {
    if (!selectedCategory || !inventory[selectedCategory]) return [];
    return filterInventoryItems(inventory[selectedCategory], searchTerm);
  }, [selectedCategory, inventory, searchTerm]);

  const renderCategoryOption = (category: JobSiteCategory) => (
    <div
      key={category}
      className={`category-option ${selectedCategory === category ? 'selected' : ''}`}
      onClick={() => handleCategorySelect(category)}
    >
      {category}
      {selectedCategory === category && <span className="checkmark">✓</span>}
    </div>
  );

  const renderInventoryRow = (item: InventoryItem, index: number) => (
    <tr
      key={item.id}
      className="inventory-row"
      onClick={() => handleItemEdit(item, selectedCategory!)}
    >
      <td className="item-number">{index + 1}</td>
      <td className="item-name">{item.item}</td>
      <td className="item-quantity">{item.quantity}</td>
      <td className="item-description">{item.description}</td>
      <td className="item-notes">{item.notes}</td>
    </tr>
  );

  const renderEmptyState = () => (
    <div className="no-selection">
      <div className="empty-state-icon">📦</div>
      <h3>No Service Selected</h3>
      <p>Please select a service on your left to proceed.</p>
    </div>
  );

  const renderInventoryTable = () => (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item, index) => renderInventoryRow(item, index))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="inventory-dashboard">
      {/* Left Panel - Category Selection */}
      <div className="left-panel">
        <h3 className="job-site-name">{jobSite.name}</h3>
        <div className="category-options">
          {jobSite.categories.map(renderCategoryOption)}
        </div>
        <button className="go-back-button" onClick={onGoBack}>
          <span className="back-arrow">←</span>
          Go Back
        </button>
      </div>

      {/* Right Panel - Data Grid */}
      <div className="right-panel">
        <div className="data-grid-header">
          <h2>{selectedCategory || 'Data Grid'}</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search a project"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="data-grid-content">
          {!selectedCategory ? renderEmptyState() : renderInventoryTable()}
        </div>
      </div>

      {/* Edit Item Modal */}
      {showEditModal && editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={handleEditModalClose}
          onSave={handleItemUpdate}
        />
      )}
    </div>
  );
};

export default InventoryDashboard;
