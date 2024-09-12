import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask, IUser, TasksService } from 'src/app/services/tasks.service';
import { Utils } from 'src/app/utils/utils';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    constructor(
        private taskService: TasksService,
        private fb: FormBuilder
    ) { }

    // Form group for the task form
    taskForm!: FormGroup;

    // Priority options for the task
    priorityList: ILabelValue[] = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ];

    // Status options for the task
    statusList: ILabelValue[] = [
        { value: 'to do', label: 'To Do' },
        { value: 'in progress', label: 'In progress' },
        { value: 'done', label: 'Done' }
    ];

    // List of user names to assign tasks to
    nameList: string[] = [];

    // Initialize the component
    ngOnInit(): void {
        // Initialize the task form with validation rules
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            priority: ['', Validators.required],
            status: ['', Validators.required],
            asignedTo: ['', Validators.required],
            description: ['', Validators.required]
        });

        // Populate the name list from stored users
        this.nameList = this.taskService.storedUsers.map((user: IUser) => user.name);

        // Subscribe to task modification events
        this.taskService.taskToModifySubject.subscribe((task: ITask | null) => {
            if (task) {
                // Patch the form with the task data if a task is to be modified
                this.taskForm.patchValue(task);
            }
        });
    }

    // Handle form submission
    onSubmit(): void {
        if (this.taskForm.valid) {
            this.createTask();
        }
    }

    // Create or modify a task
    createTask(): void {
        // Create a new task object
        let task = {
            id: Utils.generateUniqueID(),
            title: this.taskForm.get('title')?.value,
            description: this.taskForm.get('description')?.value,
            status: this.taskForm.get('status')?.value,
            priority: this.taskForm.get('priority')?.value,
            asignedTo: this.taskForm.get('asignedTo')?.value,
            createdAt: new Date()
        }

        // Check if a task is being modified
        if(this.taskService.taskToModifySubject.value) {
            // Use the existing task ID and creation date
            task.id = this.taskService.taskToModifySubject.value.id;
            task.createdAt = this.taskService.taskToModifySubject.value.createdAt;
            this.taskService.modifyTask(task);
        } else {
            // Add a new task
            this.taskService.addTask(task);
        }

        // Close the modal after task creation/modification
        this.closeModal();
    }

    // Close the task form modal
    closeModal() {
        // Reset the form
        this.taskForm.reset();
        // Clear the task to modify
        this.taskService.taskToModifySubject.next(null);
        // Hide the task form
        this.taskService.showTaskForm.next(false);
    }

}

interface ILabelValue {
    label: string;
    value: string;
}