import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "src/blog/blog-status.enum";

export class FilterPostDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;


    @IsOptional()
    @IsString()
    search?: string
}