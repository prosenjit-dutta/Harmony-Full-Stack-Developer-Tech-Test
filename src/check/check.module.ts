import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Check } from './entities/check.entity';
import { Section } from './entities/section.entity';
import { Item } from './entities/item.entity';
import { CheckResolver } from './check.resolver';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Check, Section, Item])],
  providers: [CheckResolver, SeedService],
})
export class CheckModule {}
