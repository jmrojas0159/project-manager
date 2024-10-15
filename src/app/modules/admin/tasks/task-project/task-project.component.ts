import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { Task } from 'src/app/shared/models/task.model';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-task-project',
  templateUrl: './task-project.component.html',
  styleUrls: ['./task-project.component.css'],
  providers: [ConfirmationService]
})
export class TaskProjectsComponent implements OnInit {
  tasks: Task[] = [];
  projectId: number = 0;


  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private router: Router,) {
  }

  ngOnInit() {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTaskByProjectId(this.projectId).subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }
}

