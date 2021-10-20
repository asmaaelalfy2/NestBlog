import { IsEnum } from "class-validator";
import { TaskStatus } from "src/blog/blog-status.enum";

export class UpdatePostDto {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}