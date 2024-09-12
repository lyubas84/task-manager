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
        this.tasksService.getTasks();
        this.subscription = this.tasksService.getUsers().subscribe((users) => {
            this.users = users;
        });
        this.tasksService.storedTasksSubject.subscribe(tasks => {
            this.tasks = tasks;
        });
    }
    filterTasksByStatus(status: string): ITask[] {
        return this.tasks.filter(task => task.status === status);
      }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        };
    }
}