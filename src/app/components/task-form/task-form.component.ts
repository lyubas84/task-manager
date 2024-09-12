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

    taskForm!: FormGroup;
    priorityList: ILabelValue[] = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
    ];

    statusList: ILabelValue[] = [
        { value: 'to do', label: 'To Do' },
        { value: 'in progress', label: 'In progress' },
        { value: 'done', label: 'Done' }
    ];

    nameList: string[] = [];

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            title: ['', Validators.required],
            priority: ['', Validators.required],
            status: ['', Validators.required],
            asignedTo: ['', Validators.required],
            description: ['', Validators.required]
        });
        this.nameList = this.taskService.storedUsers.map((user: IUser) => user.name);
        this.taskService.taskToModifySubject.subscribe((task: ITask | null) => {
            if (task) {
                this.taskForm.patchValue(task);
            }
        });
    }

    onSubmit(): void {
        if (this.taskForm.valid) {
            this.createTask();
        }
    }

    createTask(): void {
        let task = {
            id: Utils.generateUniqueID(),
            title: this.taskForm.get('title')?.value,
            description: this.taskForm.get('description')?.value,
            status: this.taskForm.get('status')?.value,
            priority: this.taskForm.get('priority')?.value,
            asignedTo: this.taskForm.get('asignedTo')?.value,
            createdAt: new Date()
        }
        if(this.taskService.taskToModifySubject.value) {
            task.id = this.taskService.taskToModifySubject.value.id;
            task.createdAt = this.taskService.taskToModifySubject.value.createdAt;
            this.taskService.modifyTask(task)
        } else {
            this.taskService.addTask(task);
        }
        this.closeModal();
    }

    closeModal() {
        this.taskForm.reset();
        this.taskService.taskToModifySubject.next(null);
        this.taskService.showTaskForm.next(false);
    }

}

interface ILabelValue {
    label: string;
    value: string;
}