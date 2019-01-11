import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '@workshop/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  // any property declaration is available to be bound to the template
  // by convention observable streams use $ sufix
  projects$: Observable<Project[]>;

  primaryColorPropertyBinding = "Orange";

  selectedProject: Project;

  constructor(private projectsService: ProjectsService) { }

  selectProject(project) {
    this.selectedProject = project;
    console.log('SELECTED PROJECT', project);
  }

  getProjects() {
    /* this is the long way
    this.projectsService.all()
      .subscribe((results: any) => this.projects = results);
    */
    // short way create property as an Observable stream and then
    // in template use async pipe to unwrap the observable
    // *ngFor="let project of projects$ | async"
    this.projects$ = this.projectsService.all();
  }

  cancel() {
    this.selectProject(null);
  }

  // is fired when basically all of the data or
  // all of the bindings for a component has been satisfied
  // is the safest place to put something (async assingment?)
  ngOnInit() {
    this.getProjects();
  }

}
