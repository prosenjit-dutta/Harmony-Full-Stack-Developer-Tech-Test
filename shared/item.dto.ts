export class ItemDto {
  id: string;
  question: string;
  helpText?: string;
  response: string;
  notes?: string;
  requiresAction: boolean;
  lastUpdated: Date;
}
