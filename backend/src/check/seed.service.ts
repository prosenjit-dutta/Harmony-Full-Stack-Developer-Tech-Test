import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from './entities/check.entity';
import { Section } from './entities/section.entity';
import { Item } from './entities/item.entity';
import type { CheckData } from '@shared/interfaces/check-data.interface';
import checkDataJson from '../data/check.json';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly data: CheckData = checkDataJson as CheckData;

  constructor(
    @InjectRepository(Check) private readonly checkRepo: Repository<Check>,
  ) {}

  async onModuleInit() {
    // Only seed once
    const exists = await this.checkRepo.findOne({
      where: { id: this.data.id },
    });
    if (exists) {
      console.log('ℹ️ Seed skipped (record already exists).');
      return;
    }

    // Map JSON -> Entities (dates + relations)
    const check = new Check();
    check.id = this.data.id;
    check.buildingName = this.data.buildingName;
    check.address = this.data.address;
    check.responsiblePerson = this.data.responsiblePerson;
    check.assessor = this.data.assessor;
    check.dateOfAssessment = new Date(this.data.dateOfAssessment);
    check.useOfPremises = this.data.useOfPremises;
    check.numberOfFloors = this.data.numberOfFloors;
    check.construction = this.data.construction;
    check.maxOccupancy = this.data.maxOccupancy;
    check.status = this.data.status;
    check.overallCompletionPercentage = this.data.overallCompletionPercentage;
    check.lastUpdated = new Date(this.data.lastUpdated);
    check.nextReviewDate = new Date(this.data.nextReviewDate);

    check.sections = this.data.sections.map((s) => {
      const section = new Section();
      section.id = s.id;
      section.title = s.title;
      section.description = s.description;
      section.order = s.order;
      section.completionPercentage = s.completionPercentage;

      section.items = s.items.map((i) => {
        const item = new Item();
        item.id = i.id;
        item.question = i.question;
        item.helpText = i.helpText ?? undefined;
        item.response = i.response;
        item.notes = i.notes ?? undefined;
        item.requiresAction = i.requiresAction;
        item.lastUpdated = new Date(i.lastUpdated);
        return item;
      });

      return section;
    });

    await this.checkRepo.save(check); // cascades sections/items
    console.log('✅ Seed data inserted into SQLite.');
  }
}
