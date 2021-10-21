import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Date } from 'mongoose';
import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class LessonType {
    @PrimaryGeneratedColumn('uuid')
    @Field((type) => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    startDate: string;

    // @Column()
    // @Field()
    // endDate: string;
}
