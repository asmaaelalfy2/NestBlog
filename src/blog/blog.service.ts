import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './blog-status.enum'
import { v4 as uuid } from 'uuid'
import { createPostDto } from '../dtos/create-post.dto'
import { FilterPostDto } from 'src/dtos/filter-search-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { GetUser } from 'src/auth/get-user.decorator';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(BlogRepository) private blogRepo: BlogRepository) { }

    async getAllPosta(filtrDto: FilterPostDto, user: User): Promise<Blog[]> {

        const { status, search } = filtrDto
        const query = this.blogRepo.createQueryBuilder('blog')
        query.where({ user })

        if (status) {
            query.andWhere('blog.status= :status', { status })
        }
        if (search) {
            query.andWhere('(blog.title LIKE :search OR blog.description LIKE (:search))', { search: `%${search}%` })
            // { search: `%${search}%` })
        }
        const posts = await query.getMany()
        return posts

    }

    async createPost(createPost: createPostDto, user: User): Promise<Blog> {

        const { description, title } = createPost

        const blog = this.blogRepo.create({

            description, title, status: TaskStatus.OPEN, user
        })

        await this.blogRepo.save(blog)
        return blog

    }

    async getPostById(id: string, user: User): Promise<Blog> {
        const singlepost = await this.blogRepo.findOne({ where: { id, user } });

        if (!singlepost) {
            throw new NotFoundException("id not found")
        }
        return singlepost
    }
    async deletePostById(id: string, user: User): Promise<Blog> {
        const post = await this.blogRepo.findOne({ id, user })
        if (!post) {
            throw new NotFoundException("post not found")
        }
        return this.blogRepo.remove(post)



    }

    async updatePost(id: string, status: TaskStatus, user: User): Promise<Blog> {

        const task = await this.getPostById(id, user)

        task.status = status
        await this.blogRepo.save(task);
        return task;

    }

    // getFilteredPosts(filterPost: FilterPostDto) {

    //     const { search, status } = filterPost;
    //     let tasks = this.getAllPosta();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)

    //     } if (search) {
    //         tasks = tasks.filter(task => {
    //             if ((task.title.includes(search)) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false
    //         })
    //     }




    //     return tasks;


    // }

}
