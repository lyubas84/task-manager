import { Component, OnDestroy, OnInit } from '@angular/core';
import { shareReplay, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { ITask, IUser, TasksService } from 'src/app/services/tasks.service';

@Component({
    selector: 'app-tasks-board',
    templateUrl: './tasks-board.component.html',
    styleUrls: ['./tasks-board.component.scss']
})
export class TasksBoardComponent implements OnInit, OnDestroy {
    constructor(
        private tasksService: TasksService,
        public loaderService: LoaderService
    ) {}

    private subscription!: Subscription;
    users!: IUser[];
    tasks!: ITask[];

    ngOnInit(): void {
        // Fetch tasks from the service
        this.tasksService.getTasks();
        
        // Subscribe to the users observable and store the users
        this.subscription = this.tasksService.getUsers().subscribe((users) => {
            this.users = users;
        });
        
        // Subscribe to the storedTasksSubject to get the tasks
        this.tasksService.storedTasksSubject.subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    // Filter tasks by their status
    filterTasksByStatus(status: string): ITask[] {
        return this.tasks.filter(task => task.status === status);
    }

    ngOnDestroy(): void {
        // Unsubscribe from the users observable to prevent memory leaks
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}