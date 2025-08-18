import { ItemDto } from './item.dto';

export class SectionDto {
  id: string;
  title: string;
  description: string;
  order: number;
  completionPercentage: number;
  items: ItemDto[];
}
