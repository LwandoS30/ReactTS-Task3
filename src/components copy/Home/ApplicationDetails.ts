export type ApplicationStatus = 'applied' | 'interviewed' | 'rejected' | 'accepted';

export interface ApplicationDetails {
    id: number;
    jobTitle: string;
    role: string;
    duties: string;
    qualifications: string;
    experience: string;
    companyEmail: string;
    companyNumber: string;
    companyName: string;
    companyAddress: string;
    companyVision: string;
    companyMission: string;
    companyObjectives: string;
    companyCulture: string;
    status: ApplicationStatus;
};