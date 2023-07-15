import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
            return this.TasksService.getTasksWithFilters(filterDto);
        } else {
            return this.TasksService.getAllTasks();
        }
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body() UpdateTaskStatusDto: UpdateTaskStatusDTO):Task {
        const {status} = UpdateTaskStatusDto;
        return this.TasksService.updateTaskStatus(id, status);
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void {
        return this.TasksService.deleteTask(id);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto
    ): Task {
        return this.TasksService.createTask(CreateTaskDto);
    }
}


