import { EntityRepository, Repository } from "typeorm";
// import { Blog } from "./blog.entity";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

}