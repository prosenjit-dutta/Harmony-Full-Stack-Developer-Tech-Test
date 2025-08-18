import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Check } from './entities/check.entity';
import { Section } from './entities/section.entity';
import { Item } from './entities/item.entity';
import { CheckResolver } from './check.resolver';
import { SeedService } from './seed.service';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Check, Section, Item])],
  controllers: [CheckController],
  providers: [CheckResolver, SeedService, CheckService],
})
export class CheckModule {}
