import React, { useState, useMemo } from 'react';
import './JobSitesList.css';
import CreateJobSiteModal from './CreateJobSiteModal';
import { JobSiteListProps } from '../types';
import { filterJobSites, getStatusCounts } from '../utils/helpers';

const JobSitesList: React.FC<JobSiteListProps> = ({ 
  jobSites, 
  onJobSiteSelect, 
  onAddJobSite, 
  statusCounts 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const filteredJobSites = useMemo(() => 
    filterJobSites(jobSites, searchTerm), 
    [jobSites, searchTerm]
  );

  const actualStatusCounts = useMemo(() => 
    getStatusCounts(jobSites), 
    [jobSites]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateModalClose = () => {
    setShowCreateModal(false);
  };

  const handleCreateModalSave = (newJobSite: any) => {
    onAddJobSite(newJobSite);
    setShowCreateModal(false);
  };

  const handleJobSiteClick = (jobSite: any) => {
    onJobSiteSelect(jobSite);
  };

  const renderStatusCard = (status: keyof typeof actualStatusCounts, count: number) => (
    <div key={status} className={`status-card status-${status.toLowerCase().replace(' ', '-')}`}>
      <span className="status-number">{count}</span>
      <span className="status-label">{status}</span>
    </div>
  );

  const renderJobSiteRow = (jobSite: any) => (
    <tr 
      key={jobSite.id}
      className="job-site-row"
      onClick={() => handleJobSiteClick(jobSite)}
    >
      <td className="job-site-name">
        {jobSite.name}
      </td>
      <td>
        <span className={`status-badge status-${jobSite.status.toLowerCase().replace(' ', '-')}`}>
          {jobSite.status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="job-sites-container">
      {/* Status Summary Cards */}
      <div className="status-cards">
        {Object.entries(actualStatusCounts).map(([status, count]) => 
          renderStatusCard(status as keyof typeof actualStatusCounts, count)
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <div className="header-left">
            <h2>Title</h2>
            <p className="info-text">
              <span className="info-icon">ℹ</span>
              Informative piece of text that can be used regarding this modal.
            </p>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by jobsite name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            <button 
              className="create-button"
              onClick={() => setShowCreateModal(true)}
            >
              Create +
            </button>
          </div>
        </div>

        {/* Job Sites Table */}
        <div className="table-container">
          <table className="job-sites-table">
            <thead>
              <tr>
                <th>Jobsite Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobSites.map(renderJobSiteRow)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Job Site Modal */}
      {showCreateModal && (
        <CreateJobSiteModal
          onClose={handleCreateModalClose}
          onSave={handleCreateModalSave}
        />
      )}
    </div>
  );
};

export default JobSitesList;
