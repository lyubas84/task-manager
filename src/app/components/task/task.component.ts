import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: ITask;

  modifyTask(task: ITask): void {
    console.log('Task modified', task);
  }

  deleteTask(task: ITask): void {
    console.log('Task deleted', task);
  }

  getTaskIconClass(task: ITask): string {
    switch (task.status.toLowerCase()) {
      case 'to do':
        return 'pi pi-calendar-plus text-primary';
      case 'in progress':
        return 'pi pi-hourglass text-yellow-500';
      case 'done':
        return 'pi pi-check-circle text-green-500';
      default:
        return '';
    }
  }
  
  getTaskPriorityClass(task: ITask): string {
    switch (task.priority.toLowerCase()) {
      case 'low':
        return 'bg-teal-300';
      case 'medium':
        return 'bg-yellow-300';
      case 'high':
        return 'bg-red-300';
      default:
        return '';
    }
  }

  getTaskStatusClass(task: ITask): string {
    switch (task.status.toLowerCase()) {
      case 'to do':
        return 'bg-blue-300';
      case 'in progress':
        return 'bg-yellow-300';
      case 'done':
        return 'bg-green-300';
      default:
        return '';
    }
  }

}
