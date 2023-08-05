import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TasksRepository } from "./tasks.repository";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});
const mockUser = {
    username: 'ArielUser',
    id: 'someId',
    password: 'SomePassword',
    tasks: []
}

describe("TasksService", () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        // Inicjalizacja modułu NestJS z taskService i taskRepository
        const module = await Test.createTestingModule({
            providers: [TasksService, {provide: TasksRepository, useFactory: mockTasksRepository}],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        tasksRepository = await module.get<TasksRepository>(TasksRepository);
    });

    describe("getTasks", () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            expect(result).toEqual('someValue')
        });
    });

    describe("getTaksById", () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: "Test title",
                description: "Test desc",
                id: 'someId',
                status: TaskStatus.OPEN
            }
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        })
        // it('calls TasksRepository.findOne and returns the error', async () => {
        //     tasksRepository.findOne.mockResolvedValue(null);
        //     expect(tasksService.getTaskById('otherId', mockUser)).rejects.toEqual(new NotFoundException(`Task with ID otherId not found`));
        // });
    });
});