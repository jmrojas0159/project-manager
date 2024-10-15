import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Task } from 'src/app/shared/models/task.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [ConfirmationService]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  tasksId: number = 0;
  selectedTaskId: number | null = null;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.tasksId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  addTasks() {
    this.router.navigate(['/tasks/new']);
  }

  editTask(tasksId: number): void {
    this.router.navigate(['/tasks/edit', tasksId]);
  }

  confirmDelete(tasksId: number) {
    this.selectedTaskId = tasksId;
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar esta tarea?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask(this.selectedTaskId);
        this.confirmationService.close();
      },
      reject: () => {
        this.onReject();
        this.confirmationService.close();
      }
    });
  }

  deleteTask(tasksId: number | null) {
    if (tasksId !== null) {
      this.tasksService.deleteTask(tasksId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(tasks => tasks.id !== tasksId);
        },
        error: (err) => {
          console.error('Error al eliminar la tarea:', err);
        }
      });
    } else {
      console.error('ID de tarea no válido');
    }
  }


  onReject() {
    this.selectedTaskId = null;
    this.confirmationService.close();
  }

  onAccept() {
    if (this.selectedTaskId) {
      this.deleteTask(this.selectedTaskId);
    }
  }
}
