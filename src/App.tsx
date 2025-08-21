import React, { useState, useCallback } from 'react';
import './App.css';
import JobSitesList from './components/JobSitesList';
import InventoryDashboard from './components/InventoryDashboard';
import { JobSite, CreateJobSiteFormData, JobSiteStatus } from './types';
import { generateId, getStatusCounts } from './utils/helpers';

const App: React.FC = () => {
  const [selectedJobSite, setSelectedJobSite] = useState<JobSite | null>(null);
  const [jobSites, setJobSites] = useState<JobSite[]>([
    {
      id: 1,
      name: "1658 E 23rd St, Brooklyn, NY 11229, USA",
      status: "On Hold",
      categories: ["Sidewalk Shed", "Scaffold"]
    },
    {
      id: 2,
      name: "1705 E 22nd St, Brooklyn, NY 11229, USA",
      status: "On Hold",
      categories: ["Sidewalk Shed", "Scaffold", "Shoring"]
    },
    {
      id: 3,
      name: "47 Lake St, Brooklyn, NY 11223, USA",
      status: "Completed",
      categories: ["Sidewalk Shed"]
    },
    {
      id: 4,
      name: "86-04 Shore Pkwy, Jamaica, NY 11414, USA",
      status: "In Progress",
      categories: ["Scaffold", "Shoring"]
    },
    {
      id: 5,
      name: "262 3rd Avenue, New York",
      status: "In Progress",
      categories: ["Sidewalk Shed", "Scaffold"]
    },
    {
      id: 6,
      name: "123 Main St, Brooklyn, NY 11201, USA",
      status: "Completed",
      categories: ["Sidewalk Shed", "Scaffold", "Shoring"]
    },
    {
      id: 7,
      name: "456 Oak Ave, Queens, NY 11375, USA",
      status: "On Hold",
      categories: ["Scaffold"]
    }
  ]);

  const handleJobSiteSelect = useCallback((jobSite: JobSite) => {
    setSelectedJobSite(jobSite);
  }, []);

  const handleGoBack = useCallback(() => {
    setSelectedJobSite(null);
  }, []);

  const addJobSite = useCallback((newJobSite: CreateJobSiteFormData) => {
    if (newJobSite.status === '') return; // Don't add if status is empty
    
    const jobSiteWithId: JobSite = {
      ...newJobSite,
      id: generateId(),
      status: newJobSite.status as JobSiteStatus
    };
    setJobSites(prev => [...prev, jobSiteWithId]);
  }, []);

  const updateJobSite = useCallback((updatedJobSite: JobSite) => {
    setJobSites(prev => prev.map(js => 
      js.id === updatedJobSite.id ? updatedJobSite : js
    ));
  }, []);

  if (selectedJobSite) {
    return (
      <InventoryDashboard 
        jobSite={selectedJobSite}
        onGoBack={handleGoBack}
        onUpdateJobSite={updateJobSite}
      />
    );
  }

  return (
    <div className="App">
      <JobSitesList 
        jobSites={jobSites}
        onJobSiteSelect={handleJobSiteSelect}
        onAddJobSite={addJobSite}
        statusCounts={getStatusCounts(jobSites)}
      />
    </div>
  );
};

export default App;
