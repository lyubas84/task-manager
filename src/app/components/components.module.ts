import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MenuItemsComponent } from './menu-items/menu-items.component';

@NgModule({
  declarations: [
    SideBarComponent,
    TasksBoardComponent,
    NavBarComponent,
    DashboardComponent,
    MenuItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports: [
    SideBarComponent,
    TasksBoardComponent,
    NavBarComponent
  ]
})
export class ComponentsModule { }
