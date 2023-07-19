import { DataSource, Repository } from "typeorm";
import {Injectable} from '@nestjs/common';
import { Task } from "./task.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource)
    {
        super(Task, dataSource.createEntityManager());
    }

    async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = CreateTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.save(task);

        return task;
    }
}