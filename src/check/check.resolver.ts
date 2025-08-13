import { Resolver, Query, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from './entities/check.entity';

@Resolver(() => Check)
export class CheckResolver {
  constructor(
    @InjectRepository(Check)
    private readonly checkRepo: Repository<Check>,
  ) {}

  @Query(() => [Check], { name: 'checks' })
  findAll() {
    return this.checkRepo.find({ relations: ['sections', 'sections.items'] });
  }

  @Query(() => Check, { name: 'check', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.checkRepo.findOne({
      where: { id },
      relations: ['sections', 'sections.items'],
    });
  }
}
