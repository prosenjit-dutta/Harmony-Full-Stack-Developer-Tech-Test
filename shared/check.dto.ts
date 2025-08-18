import { SectionDto } from './section.dto';

export class CheckDto {
  id: string;
  buildingName: string;
  address: string;
  responsiblePerson: string;
  assessor: string;
  dateOfAssessment: Date;
  useOfPremises: string;
  numberOfFloors: number;
  construction: string;
  maxOccupancy: number;
  status: string;
  overallCompletionPercentage: number;
  lastUpdated: Date;
  nextReviewDate: Date;
  sections: SectionDto[];
}
