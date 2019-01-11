import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  model = 'projects';

  constructor(private http: HttpClient) { }

  private getUrl(): string {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlForId(id): string {
    return `${this.getUrl()}/${id}`;
  }

  all() {
    return this.http.get(this.getUrl());
  }

  create(project) {
    return this.http.post(this.getUrl(), project);
  }

  update(project) {
    return this.http.patch(this.getUrlForId(project.id), project);
  }

  delete(projectId) {
    return this.http.delete(this.getUrlForId(projectId));
  }

}
