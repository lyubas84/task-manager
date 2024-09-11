import { Component } from '@angular/core';
import { ITask, TasksServiceService } from 'src/app/services/tasks-service.service';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss']
})
export class TasksBoardComponent {
  constructor(
    private tasksService: TasksServiceService
  ){}

  tasks$ = this.tasksService.getTasks();
}
