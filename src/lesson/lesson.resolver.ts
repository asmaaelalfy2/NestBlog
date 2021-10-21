// import { Query } from "@nestjs/common";
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.entity';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Param } from '@nestjs/common';

@Resolver((of) => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) { }
    @Query((returns) => [LessonType])
    lesson(): Promise<LessonType[]> {
        return this.lessonService.lesson();
    }

    @Query((returns) => LessonType)
    lessonById(@Args('id') id: string): Promise<any> {
        return this.lessonService.getLesonById(id);
    }

    @Mutation((returns) => LessonType)
    async createLesson(@Args('lesson') lesson: CreateLessonDto): Promise<any> {
        return await this.lessonService.createLesson(lesson);
    }
}
