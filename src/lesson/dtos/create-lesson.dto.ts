import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLessonDto {
    @Field()
    // @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    startDate?: string;
    // @Field({ nullable: true })
    // endDate?: string;
}
