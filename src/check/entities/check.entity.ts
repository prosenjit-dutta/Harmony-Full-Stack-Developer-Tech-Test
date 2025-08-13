import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@ObjectType()
@Entity()
export class Check {
  @Field()
  @PrimaryColumn()
  id: string; // e.g., "chk-001" (string id from JSON)

  @Field() @Column() buildingName: string;
  @Field() @Column() address: string;
  @Field() @Column() responsiblePerson: string;
  @Field() @Column() assessor: string;

  @Field(() => GraphQLISODateTime) @Column() dateOfAssessment: Date;

  @Field() @Column() useOfPremises: string;
  @Field(() => Int) @Column('integer') numberOfFloors: number;
  @Field() @Column() construction: string;
  @Field(() => Int) @Column('integer') maxOccupancy: number;

  @Field() @Column() status: string;

  @Field(() => Int) @Column('integer') overallCompletionPercentage: number;

  @Field(() => GraphQLISODateTime) @Column() lastUpdated: Date;
  @Field(() => GraphQLISODateTime) @Column() nextReviewDate: Date;

  @Field(() => [Section])
  @OneToMany(() => Section, (section) => section.check, { cascade: true })
  sections: Section[];
}
