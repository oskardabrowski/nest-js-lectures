import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string) {
        return this.TasksService.deleteTaskBydId(id);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto
    ): Task {
        return this.TasksService.createTask(CreateTaskDto);
    }
}
