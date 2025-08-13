import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Check } from './check.entity';
import { Item } from './item.entity';

@ObjectType()
@Entity()
export class Section {
  @Field()
  @PrimaryColumn()
  id: string; // e.g., "sec-001-1"

  @Field() @Column() title: string;
  @Field() @Column() description: string;
  @Field(() => Int) @Column('integer') order: number;
  @Field(() => Int) @Column('integer') completionPercentage: number;

  @ManyToOne(() => Check, (check) => check.sections, { onDelete: 'CASCADE' })
  @JoinColumn()
  check: Check;

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.section, { cascade: true })
  items: Item[];
}
