import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from './entities/check.entity';

@Injectable()
export class CheckService {
  constructor(
    @InjectRepository(Check)
    private readonly checkRepo: Repository<Check>,
  ) {}

  async getSummaryList(
    status?: string,
    sortBy: keyof Check = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    if (sortBy && !['id', 'status', 'name'].includes(sortBy)) {
      throw new BadRequestException(`Invalid sort field: ${sortBy}`);
    }

    const query = this.checkRepo
      .createQueryBuilder('check')
      .leftJoinAndSelect('check.sections', 'section')
      .leftJoinAndSelect('section.items', 'item');

    if (status) {
      query.where('check.status = :status', { status });
    }

    query.orderBy(`check.${sortBy}`, sortOrder);

    const results = await query.getMany();

    if (!results.length) {
      throw new NotFoundException('No records found for the given criteria');
    }

    // Transform results to summary format
    return results.map((check) => {
      const pendingActionItems =
        check.sections
          ?.flatMap((section) => section.items || [])
          .filter((item) => item.requiresAction).length || 0;

      return {
        id: check.id,
        buildingName: check.buildingName,
        address: check.address,
        status: check.status,
        overallCompletionPercentage: check.overallCompletionPercentage,
        lastUpdated: check.lastUpdated,
        pendingActionItems,
      };
    });
  }

  async getCheckById(id: string) {
    const check = await this.checkRepo.findOne({
      where: { id },
      relations: ['sections', 'sections.items'],
    });
    if (!check) {
      throw new NotFoundException(`Check with ID ${id} not found`);
    }
    return check;
  }
}
