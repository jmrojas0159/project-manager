import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [ConfirmationService]

})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  displayModal: boolean = false;
  selectedProjectId: number | null = null;
  selectedProject: any;

  constructor(private projectsService: ProjectsService,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openTaskView(projectId: number): void {
    this.router.navigate(['/tasks/project', projectId]);
  }

  openDeleteModal(project: any): void {
    this.selectedProject = project;
    this.displayModal = true;
  }

  confirmDelete(projectId: number) {
    this.selectedProjectId = projectId;
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este proyecto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProject(this.selectedProjectId);
        this.confirmationService.close();
      },
      reject: () => {
        this.onReject();
        this.confirmationService.close();
      }
    });
  }

  deleteProject(projectId: number | null) {
    if (projectId !== null) {
      this.projectsService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects.filter(project => project.id !== projectId);
        },
        error: (err) => {
          console.error('Error al eliminar el proyecto:', err);
        }
      });
    } else {
      console.error('ID de proyecto no válido');
    }
  }

  addProject() {
    this.router.navigate(['/projects/new']);
  }

  onReject() {
    this.selectedProjectId = null;
    this.confirmationService.close();
  }

  onAccept() {
    if (this.selectedProjectId) {
      this.deleteProject(this.selectedProjectId);

    }
  }

  editProject(projectId: number): void {
    this.router.navigate(['/projects/edit', projectId]);
  }


}
