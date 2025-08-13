export interface CheckData {
  id: string;
  buildingName: string;
  address: string;
  responsiblePerson: string;
  assessor: string;
  dateOfAssessment: string; // ISO string in JSON
  useOfPremises: string;
  numberOfFloors: number;
  construction: string;
  maxOccupancy: number;
  status: string;
  overallCompletionPercentage: number;
  lastUpdated: string; // ISO string
  nextReviewDate: string; // ISO string
  sections: SectionData[];
}

export interface SectionData {
  id: string;
  title: string;
  description: string;
  order: number;
  completionPercentage: number;
  items: ItemData[];
}

export interface ItemData {
  id: string;
  question: string;
  helpText?: string | null | undefined;
  response: string;
  notes?: string | null | undefined;
  requiresAction: boolean;
  lastUpdated: string; // ISO string
}
