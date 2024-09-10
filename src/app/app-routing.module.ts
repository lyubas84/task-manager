import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksBoardComponent } from './components/tasks-board/tasks-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'tasks-board', component: TasksBoardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'tasks-board' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
