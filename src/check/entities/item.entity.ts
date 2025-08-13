import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Section } from './section.entity';

@ObjectType()
@Entity()
export class Item {
  @Field()
  @PrimaryColumn()
  id: string; // e.g., "item-001-1-1"

  @Field() @Column() question: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  helpText?: string;

  @Field() @Column() response: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  notes?: string;

  @Field() @Column({ type: 'boolean' }) requiresAction: boolean;

  @Field(() => GraphQLISODateTime)
  @Column()
  lastUpdated: Date;

  @ManyToOne(() => Section, (section) => section.items, { onDelete: 'CASCADE' })
  @JoinColumn()
  section: Section;
}
