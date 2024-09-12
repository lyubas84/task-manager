import { Component, DoCheck } from '@angular/core';
import { ITask, TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements DoCheck{
    constructor(
        private taskService: TasksService
    ){}

    originalTaskList: ITask[] = [];
    checked: boolean = false;
    search = '';

    // Save original tasks for search filter
    ngDoCheck() {
        if(this.taskService.storedTasksSubject.value.length > 0 && !this.checked) {
            this.originalTaskList = this.taskService.storedTasksSubject.value;
            this.checked = true;
        }
    }

    // Task search filter for any value in the task list
    onSearch(searchTerm: string) {
        if (searchTerm) {
            const newList = this.filterTasks(searchTerm);
            this.taskService.storedTasksSubject.next(newList);
        } else {
            this.taskService.storedTasksSubject.next(this.originalTaskList);
        }
    }

    // Filter tasks function
    filterTasks(searchTerm: string): ITask[] {
        return this.originalTaskList.filter(task => {
            return Object.keys(task).some((key: string) => {
                const value = (task as any)[key];
                if (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return true;
                }
                return false;
            });
        });
    }

}
