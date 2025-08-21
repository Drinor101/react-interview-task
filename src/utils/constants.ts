import { JobSiteCategory, JobSiteStatus } from '../types';

export const AVAILABLE_CATEGORIES: JobSiteCategory[] = ['Sidewalk Shed', 'Scaffold', 'Shoring'];
export const AVAILABLE_STATUSES: JobSiteStatus[] = ['Completed', 'In Progress', 'On Hold'];

export const STATUS_MAPPING = {
  'In Progress': 'On Road',
  'Completed': 'Completed',
  'On Hold': 'On Hold'
} as const;

export const STATUS_COLORS = {
  'On Road': 'status-on-road',
  'Completed': 'status-completed',
  'In Progress': 'status-in-progress',
  'On Hold': 'status-on-hold'
} as const;

export const DEFAULT_INVENTORY_DATA = {
  'Sidewalk Shed': [
    { id: 1, item: 'G42295', quantity: 10, description: 'Safety railing system for pedestrian protection', notes: 'Install on all corners and entry points' },
    { id: 2, item: 'M721', quantity: 83, description: 'Warning signs and safety indicators', notes: 'Place every 20 feet along perimeter' },
    { id: 3, item: 'M94796', quantity: 31, description: 'Barricade system for area closure', notes: 'Use at main entry and exit points' },
    { id: 4, item: '525907', quantity: 47, description: 'Support beams for overhead protection', notes: 'Check structural integrity monthly' },
    { id: 5, item: 'A68446', quantity: 52, description: 'Foundation anchors for stability', notes: 'Ensure proper ground contact' },
    { id: 6, item: 'F3786', quantity: 10, description: 'Lighting system for night visibility', notes: 'Test all fixtures weekly' },
    { id: 7, item: 'R69895', quantity: 30, description: 'Reflective tape and markings', notes: 'Replace when visibility decreases' },
    { id: 8, item: 'A29259', quantity: 32, description: 'Access control mechanisms', notes: 'Verify functionality daily' },
    { id: 9, item: 'A41878', quantity: 16, description: 'Emergency exit systems', notes: 'Keep clear and accessible' },
    { id: 10, item: 'A37244', quantity: 13, description: 'Weather protection panels', notes: 'Inspect for damage after storms' },
    { id: 11, item: 'M89319', quantity: 10, description: 'Communication equipment mounts', notes: 'Secure all connections' }
  ],
  'Scaffold': [
    { id: 12, item: 'S001', quantity: 24, description: 'Aluminum scaffold support poles', notes: 'Check for damage before assembly' },
    { id: 13, item: 'S002', quantity: 16, description: 'Wooden platform boards for scaffolding', notes: 'Secure with proper clamps and safety' },
    { id: 14, item: 'S003', quantity: 6, description: 'Fall protection harnesses and lanyards', notes: 'Inspect monthly for wear and tear' },
    { id: 15, item: 'S004', quantity: 12, description: 'Cross braces and stabilizers', notes: 'Ensure proper tension and alignment' },
    { id: 16, item: 'S005', quantity: 8, description: 'Guard rail systems', notes: 'Install on all open sides' },
    { id: 17, item: 'S006', quantity: 20, description: 'Base plates and leveling jacks', notes: 'Check stability before use' },
    { id: 18, item: 'S007', quantity: 15, description: 'Tie-in connections', notes: 'Secure to building structure' },
    { id: 19, item: 'S008', quantity: 10, description: 'Safety net systems', notes: 'Deploy below work areas' }
  ],
  'Shoring': [
    { id: 20, item: 'SH001', quantity: 4, description: 'Hydraulic support jacks for excavation', notes: 'Calibrate weekly and check pressure' },
    { id: 21, item: 'SH002', quantity: 12, description: 'Steel support beams for shoring', notes: 'Inspect for rust and structural damage' },
    { id: 22, item: 'SH003', quantity: 8, description: 'Timber shoring components', notes: 'Check for rot and insect damage' },
    { id: 23, item: 'SH004', quantity: 6, description: 'Soil stabilization materials', notes: 'Apply according to engineering specs' },
    { id: 24, item: 'SH005', quantity: 10, description: 'Monitoring equipment for movement', notes: 'Record readings daily' },
    { id: 25, item: 'SH006', quantity: 5, description: 'Emergency backup systems', notes: 'Test monthly under load' }
  ]
};
