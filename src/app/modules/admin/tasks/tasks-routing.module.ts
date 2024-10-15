import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskFormComponent } from './task-form/task-form.component';
import { AuthGuard } from '../../auth/auth.guard';
import { TaskProjectsComponent } from './task-project/task-project.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'project/:id', component: TaskProjectsComponent, canActivate: [AuthGuard] },
  { path: 'new', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
