import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TaskProjectsComponent } from './task-project/task-project.component';
import { TasksService } from './tasks.service';
import { TaskListComponent } from './task-list/task-list.component';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    TaskProjectsComponent,
    TaskFormComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    CheckboxModule

  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TasksService, ConfirmationService]
})
export class TasksModule { }
