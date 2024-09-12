import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})

export class CreateTaskComponent {
  constructor(
    public taskService: TasksService
  ) {}

  showTaskForm: boolean = false;
  showForm() {
    this.taskService.showTaskForm.next(true);
  }

}
