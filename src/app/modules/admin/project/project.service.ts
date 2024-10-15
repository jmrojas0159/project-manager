import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpService: HttpService) { }

  getProjects(): Observable<Project[]> {
    return this.httpService.get<Project[]>(`${environment.apiJsonplaceholder}/users`);
  }

  deleteProject(projectId: number): Observable<Project> {
    return this.httpService.delete<Project>(`${environment.apiJsonplaceholder}/users/${projectId}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.httpService.get<Project>(`${environment.apiJsonplaceholder}/users/${id}`);
  }

  updateProject(project: Project): Observable<Project> {
    return this.httpService.post<Project>(`${environment.apiJsonplaceholder}/users/${project.id}`, project);
  }

  addProject(project: Project): Observable<Project> {
    return this.httpService.post<Project>(`${environment.apiJsonplaceholder}/users`, project);
  }


}
