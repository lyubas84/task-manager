import { Component } from '@angular/core';
import { TasksServiceService } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  constructor(
    private taskService: TasksServiceService
  ) {}

  createTask(): void {
    let task = {
      id: Math.floor(Math.random() * 1000000000000000),
      title: 'Create Task',
      description: 'Create a new task',
      status: 'Pending',
      priority: 'High',
      asignedTo: 'Lesiv Lyubomir',
      createdAt: new Date()
    }
    console.log(task);
    this.taskService.addTask(task).subscribe();
  }

}
