import { DataSource, Repository } from "typeorm";
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/user.entity";
import { Logger } from "@nestjs/common/services";

@Injectable()
export class TasksRepository extends Repository<Task> {
    private logger = new Logger('TasksRepository', {timestamp: true});
    constructor(private dataSource: DataSource)
    {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        query.where({user})

        if(status) query.andWhere('task.status = :status', {status: status});
        if(search) query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', {search: `%${search}%`});

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (e) {
            this.logger.error(`Failed getting task for user: "${user.username}". Filters: ${JSON.stringify(filterDto)}`, e.stack);
            throw new InternalServerErrorException();
        }
    }

    async createTask(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const {title, description} = CreateTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.save(task);

        return task;
    }
}