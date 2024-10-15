import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsRoutingModule } from './project-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProjectsService } from './project.service';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProjectsService, ConfirmationService]
})
export class ProjectsModule { }
