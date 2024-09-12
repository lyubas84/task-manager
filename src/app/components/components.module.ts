import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItemsComponent } from './menu-items/menu-items.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { LoaderComponent } from './loader/loader.component';
import { SkeletonComponent } from './skeleton/skeleton.component';

@NgModule({
  declarations: [
    SideBarComponent,
    TasksBoardComponent,
    NavBarComponent,
    DashboardComponent,
    MenuItemsComponent,
    TaskComponent,
    CreateTaskComponent,
    TaskFormComponent,
    LoaderComponent,
    SkeletonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    HttpClientModule
  ],
  exports: [
    SideBarComponent,
    TasksBoardComponent,
    NavBarComponent,
    LoaderComponent
  ]
})
export class ComponentsModule { }
