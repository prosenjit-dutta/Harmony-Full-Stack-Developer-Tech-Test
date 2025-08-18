import { Controller, Get, Param, Query } from '@nestjs/common';
import { CheckService } from './check.service';
import { Check } from './entities/check.entity';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  /**
   * GET /check
   * Optional: ?status=draft&sortBy=completionPercentage&sortOrder=DESC
   */
  @Get('summary')
  async getSummaryList(
    @Query('status') status?: string,
    @Query('sortBy') sortBy?: keyof Check,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.checkService.getSummaryList(status, sortBy, sortOrder);
  }

  /**
   * GET /check/:id
   */
  @Get(':id')
  async getCheckById(@Param('id') id: string) {
    return this.checkService.getCheckById(id);
  }
}
