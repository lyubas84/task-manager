import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private apiUrl = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    // Array to store user data
    storedUsers!: IUser[];

    // BehaviorSubject to store and observe task data
    storedTasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);

    // BehaviorSubject to control the visibility of the task form
    showTaskForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // BehaviorSubject to store and observe the task being modified
    taskToModifySubject: BehaviorSubject<ITask | null> = new BehaviorSubject<ITask | null>(null);

    // Method to fetch users from the API
    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.apiUrl}/users`).pipe(
            tap((users: IUser[]) => {
                this.storedUsers = users; // Store fetched users
            })
        );
    }

    // Method to fetch tasks from the API and update the storedTasksSubject
    getTasks(): void {
        this.http.get<ITask[]>(`${this.apiUrl}/tasks`).subscribe(data => {
            this.storedTasksSubject.next(data); // Update tasks
        });
    }

    // Method to add a new task via the API and update the storedTasksSubject
    addTask(task: ITask): void {
        this.http.post<ITask>(`${this.apiUrl}/tasks`, task).subscribe(data => {
            this.storedTasksSubject.next([...this.storedTasksSubject.value, data]); // Add new task
        });
    }

    // Method to modify an existing task via the API and update the storedTasksSubject
    modifyTask(task: ITask): void {
        this.http.patch<ITask>(`${this.apiUrl}/tasks/${task.id}`, task).subscribe(() => {
            this.storedTasksSubject.next(this.storedTasksSubject.value.map(t => t.id === task.id ? task : t)); // Update task
        });
    }

    // Method to remove a task via the API and update the storedTasksSubject
    removeTask(id: string): void {
        this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).subscribe(() => {
            this.storedTasksSubject.next(this.storedTasksSubject.value.filter(task => task.id !== id)); // Remove task
        });
    }

}

export interface ITask {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    asignedTo: string;
    createdAt: Date;
}

export interface IUser {
    name: string;
    avatar: string;
}