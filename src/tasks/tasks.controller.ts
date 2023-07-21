import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}

    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.TasksService.getTasks(filterDto);
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id:string, @Body() UpdateTaskStatusDto: UpdateTaskStatusDTO): Promise<Task> {
        const {status} = UpdateTaskStatusDto;
        return this.TasksService.updateTaskStatus(id, status);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id:string): Promise<Task> {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string): Promise<void> {
        return this.TasksService.deleteTask(id);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto
    ): Promise<Task> {
        return this.TasksService.createTask(CreateTaskDto);
    }
}


