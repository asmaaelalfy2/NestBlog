import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { LessonType } from './lesson.entity';

@Injectable()
export class LessonService {

    constructor(@InjectRepository(LessonType) private lessonRepo: Repository<LessonType>) { }
    async lesson(): Promise<LessonType[]> {
        return this.lessonRepo.find({})
    }

    async createLesson(lesson: CreateLessonDto): Promise<any> {
        const newLesson = this.lessonRepo.create(lesson);
        return this.lessonRepo.save(newLesson)
    }

    async getLesonById(id): Promise<any> {
        return this.lessonRepo.findOneOrFail(id);

    }
}
