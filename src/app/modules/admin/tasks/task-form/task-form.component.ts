import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TasksService } from '../tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  providers: [ConfirmationService]
})
export class TaskFormComponent implements OnInit {

  tasksForm: FormGroup;
  tasksId: number | null = null;
  tasks: [] = []

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) {

    this.tasksForm = this.fb.group({
      title: ['', Validators.required],
      completed: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tasksId = +id;
      this.loadTaks();
    }
  }

  backList() {
    this.router.navigate(['/tasks']);
  }

  onSubmit(): void {
    if (this.tasksForm.valid) {
      const taskData = {
        ...this.tasksForm.value,
        id: this.tasksId
      }

      if (this.tasksId) {
        this.tasksService.updateTask(taskData).subscribe(
          () => {
            this.alertService.showSuccess('Felicidades', 'Tarea actualizada exitosamente');
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('Error al actualizar la tarea');
          }
        );
      } else {
        this.tasksService.addTask(taskData).subscribe(
          () => {
            this.alertService.showSuccess('Felicidades', 'Tarea creada exitosamente');
            this.router.navigate(['/tasks']);
          },
          error => {
            console.error('Error al crear la tarea');
          }
        );
      }
    } else {
      this.tasksForm.markAllAsTouched();
      this.alertService.showError('Ups..', 'Faltan campos por completar')
    }
  }

  loadTaks(): void {
    if (this.tasksId !== null) {
      this.tasksService.getTaskById(this.tasksId!).subscribe(
        tasks => {
          this.tasksForm.patchValue({
            title: tasks.title,
            completed: tasks.completed
          });
        },
        error => {
          console.error('Error al cargar la tarea')
        }
      );
    }
  }

}
