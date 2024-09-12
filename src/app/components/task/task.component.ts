import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ITask, IUser, TasksService } from 'src/app/services/tasks.service';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class TaskComponent {
    constructor(
        public taskService: TasksService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) { }

    // Input property to receive a task object
    @Input() task!: ITask;

    // Input property to receive a list of users
    @Input() users!: IUser[];

    // Method to modify a task
    modifyTask(task: ITask): void {
        // Show the task form
        this.taskService.showTaskForm.next(true);
        // Set the task to be modified
        this.taskService.taskToModifySubject.next(task);
    }

    // Method to delete a task with confirmation
    deleteTask(event: Event, task: ITask): void {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to delete task?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Remove the task if confirmed
                this.taskService.removeTask(task.id);
            },
            reject: () => {
                // Show a message if deletion is rejected
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Task was not deleted' });
            }
        });
    }

    // Method to find the avatar of a user by name
    findAvatar(name: string): string {
        return this.users.find(user => user.name === name)?.avatar || '';
    }

    // Method to get the CSS class for the task icon based on its status
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

    // Method to get the CSS class for the task priority
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

    // Method to get the CSS class for the task status
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
