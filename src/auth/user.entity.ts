import { Blog } from "src/blog/blog.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({ unique: true })
    username: string;

    @Column()
    password: string;


    @OneToMany(() => Blog, blog => blog.user, { eager: true })

    blog: Blog[]


}