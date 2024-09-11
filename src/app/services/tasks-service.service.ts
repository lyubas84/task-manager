import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {
  constructor(
    private http: HttpClient
  ) { }

  storedTasks!: ITasks;

  getTasks(): Observable<ITasks> {
    return this.http.get<ITasks>('http://localhost:3000/tasks').pipe(
      tap((tasks: ITasks) => this.storedTasks = tasks)
    );
  }

  addTask(task: ITask): Observable<ITask> {
    this.storedTasks.toDo.push(task);
    return this.http.post<ITask>('http://localhost:3000/tasks', this.storedTasks);
  }

}

export interface ITask {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  asignedTo: string;
  createdAt: Date;
}

export interface ITasks {
  toDo: ITask[];
  inProgress: ITask[];
  done: ITask[];
}