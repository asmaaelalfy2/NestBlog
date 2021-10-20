import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { createPostDto } from 'src/dtos/create-post.dto';
import { TaskStatus } from './blog-status.enum';
import { BlogService } from './blog.service';
import { FilterPostDto } from '../dtos/filter-search-post.dto'
import { UpdatePostDto } from 'src/dtos/update-post.dto';
import { Blog } from './blog.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('blog')
@UseGuards(AuthGuard())

export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    async getPosts(@Query() postFilterSearch: FilterPostDto, @GetUser() user: User): Promise<Blog[]> {

        // if (Object.keys(FilterPostDto).length == 0) {
        //     return this.blogService.getFilteredPosts(postFilterSearch)
        // } else {
        return await this.blogService.getAllPosta(postFilterSearch, user);

        // }
    }

    @Post()
    async createPost(@Body() createPostdto: createPostDto, @GetUser() user: User): Promise<Blog> {
        return await this.blogService.createPost(createPostdto, user)
    }

    @Get(':id')
    async getPost(@Param('id') id: string, @GetUser() user: User): Promise<Blog> {
        return await this.blogService.getPostById(id, user);
    }
    //
    @Delete(":id")
    async deletePost(@Param('id') id: string, @GetUser() user: User): Promise<Blog> {
        return this.blogService.deletePostById(id, user)
    }

    @Put(":id")

    updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @GetUser() user: User): Promise<Blog> {
        const { status } = updatePostDto
        return this.blogService.updatePost(id, status, user)
    }


}
