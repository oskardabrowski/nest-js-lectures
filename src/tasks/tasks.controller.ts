import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private TasksService: TasksService) {}

    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        return this.TasksService.getTasks(filterDto, user);
    }

    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id:string, @Body() UpdateTaskStatusDto: UpdateTaskStatusDTO, @GetUser() user: User): Promise<Task> {
        const {status} = UpdateTaskStatusDto;
        return this.TasksService.updateTaskStatus(id, status, user);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id:string, @GetUser() user: User): Promise<Task> {
        return this.TasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string, @GetUser() user: User): Promise<void> {
        return this.TasksService.deleteTask(id, user);
    }

    @Post()
    createTask(
        @Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        return this.TasksService.createTask(CreateTaskDto, user);
    }
}


