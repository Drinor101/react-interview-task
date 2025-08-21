export interface JobSite {
  id: number;
  name: string;
  status: JobSiteStatus;
  categories: JobSiteCategory[];
}

export interface InventoryItem {
  id: number;
  item: string;
  quantity: number;
  description: string;
  notes: string;
}

export interface InventoryData {
  [category: string]: InventoryItem[];
}

export interface StatusCounts {
  'On Road': number;
  'Completed': number;
  'On Hold': number;
}

export interface CreateJobSiteFormData {
  name: string;
  categories: JobSiteCategory[];
  status: JobSiteStatus | '';
}

export interface EditItemFormData {
  item: string;
  quantity: number;
  description: string;
  notes: string;
}

export type JobSiteStatus = 'Completed' | 'In Progress' | 'On Hold';
export type JobSiteCategory = 'Sidewalk Shed' | 'Scaffold' | 'Shoring';

export interface JobSiteListProps {
  jobSites: JobSite[];
  onJobSiteSelect: (jobSite: JobSite) => void;
  onAddJobSite: (jobSite: CreateJobSiteFormData) => void;
  statusCounts: StatusCounts;
}

export interface InventoryDashboardProps {
  jobSite: JobSite;
  onGoBack: () => void;
  onUpdateJobSite: (jobSite: JobSite) => void;
}

export interface CreateJobSiteModalProps {
  onClose: () => void;
  onSave: (jobSite: CreateJobSiteFormData) => void;
}

export interface EditItemModalProps {
  item: InventoryItem & { category: JobSiteCategory };
  onClose: () => void;
  onSave: (item: InventoryItem & { category: JobSiteCategory }) => void;
}
