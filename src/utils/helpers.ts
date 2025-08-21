import { JobSite, StatusCounts, JobSiteStatus } from '../types';
import { STATUS_MAPPING } from './constants';

export const getStatusCounts = (jobSites: JobSite[]): StatusCounts => {
  const initialCounts: StatusCounts = { 'On Road': 0, 'Completed': 0, 'On Hold': 0 };
  
  return jobSites.reduce((counts, jobSite) => {
    const mappedStatus = STATUS_MAPPING[jobSite.status];
    if (mappedStatus) {
      counts[mappedStatus]++;
    }
    return counts;
  }, initialCounts);
};

export const filterJobSites = (jobSites: JobSite[], searchTerm: string): JobSite[] => {
  if (!searchTerm.trim()) return jobSites;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return jobSites.filter(jobSite =>
    jobSite.name.toLowerCase().includes(lowerSearchTerm)
  );
};

export const filterInventoryItems = (
  items: any[],
  searchTerm: string
): any[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return items.filter(item =>
    item.item.toLowerCase().includes(lowerSearchTerm) ||
    item.description.toLowerCase().includes(lowerSearchTerm)
  );
};

export const generateId = (): number => Date.now();

export const getStatusColor = (status: JobSiteStatus): string => {
  const statusColorMap: Record<JobSiteStatus, string> = {
    'Completed': 'status-completed',
    'In Progress': 'status-in-progress',
    'On Hold': 'status-on-hold'
  };
  
  return statusColorMap[status] || '';
};

export const isFormValid = (formData: { name: string; categories: string[]; status: string }): boolean => {
  return Boolean(
    formData.name.trim() && 
    formData.categories.length > 0 && 
    formData.status
  );
};
