import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./blog-status.enum";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(() => User, user => user.blog, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User


}