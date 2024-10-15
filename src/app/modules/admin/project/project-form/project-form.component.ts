import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  project: [] = []
  projectId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = +id;
      this.loadProject();
    }
  }

  loadProject(): void {
    if (this.projectId !== null) {
      this.projectsService.getProjectById(this.projectId!).subscribe(
        project => {
          this.projectForm.patchValue({
            name: project.name,
            description: project.email
          });
        },
        error => {
          console.error('Error al cargar el proyecto')
        }
      );
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
        id: this.projectId
      };

      if (this.projectId) {
        this.projectsService.updateProject(projectData).subscribe(
          () => {
            this.alertService.showSuccess('Felicidades', 'Proyecto actualizado exitosamente');
            this.router.navigate(['/projects']);
          },
          error => {
            console.error('Error al actualizar el proyecto');
          }
        );
      } else {
        this.projectsService.addProject(projectData).subscribe(
          () => {
            this.alertService.showSuccess('Felicidades', 'Proyecto creado exitosamente');
            this.router.navigate(['/projects']);
          },
          error => {
            console.error('Error al crear el proyecto');
          }
        );
      }
    } else {
      this.projectForm.markAllAsTouched();
      this.alertService.showError('Ups..', 'Faltan campos por completar.')
    }
  }

  backList() {
    this.router.navigate(['/projects']);
  }
}


