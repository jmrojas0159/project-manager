import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpService: HttpService) { }

  getTasks(): Observable<Task[]> {
    return this.httpService.get<Task[]>(`${environment.apiJsonplaceholder}/todos`);
  }

  getTaskByProjectId(projectId: number): Observable<Task[]> {
    return this.httpService.get<Task[]>(`${environment.apiJsonplaceholder}/todos?userId=${projectId}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.httpService.get<Task>(`${environment.apiJsonplaceholder}/todos/${id}`);
  }


  deleteTask(taskId: number): Observable<Task> {
    return this.httpService.delete<Task>(`${environment.apiJsonplaceholder}/todos/${taskId}`);
  }

  updateTask(tasks: Task): Observable<Task> {
    return this.httpService.post<Task>(`${environment.apiJsonplaceholder}/todos/${tasks.id}`, tasks);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpService.post<Task>(`${environment.apiJsonplaceholder}/todos`, task);
  }
}
