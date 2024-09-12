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

    storedUsers!: IUser[];
    storedTasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
    showTaskForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    taskToModifySubject: BehaviorSubject<ITask | null> = new BehaviorSubject<ITask | null>(null);

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`${this.apiUrl}/users`).pipe(
            tap((users: IUser[]) => {
                this.storedUsers = users;
            })
        );
    }

    getTasks(): void {
        this.http.get<ITask[]>(`${this.apiUrl}/tasks`).subscribe(data => {
            this.storedTasksSubject.next(data);
        });
    }

    addTask(task: ITask): void {
        this.http.post<ITask>(`${this.apiUrl}/tasks`, task).subscribe(data => {
            this.storedTasksSubject.next([...this.storedTasksSubject.value, data]);
        });
    }

    modifyTask(task: ITask): void {
        this.http.patch<ITask>(`${this.apiUrl}/tasks/${task.id}`, task).subscribe(() => {
            this.storedTasksSubject.next(this.storedTasksSubject.value.map(t => t.id === task.id? task : t));
        });
    }

    removeTask(id: string): void {
        this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).subscribe(() => {
            this.storedTasksSubject.next(this.storedTasksSubject.value.filter(task => task.id !== id));
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