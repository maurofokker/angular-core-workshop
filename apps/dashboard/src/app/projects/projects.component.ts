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
  projects$; //: Observable<Project[]>;

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
    this.resetProject();
  }

  saveProject(project) {
    console.log('SAVING PROJECT', project);
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
    this.projectsService.create(project)
      .subscribe(results => {
        this.getProjects();
        this.resetProject();
      });
  }

  updateProject(project) {
    this.projectsService.update(project)
      .subscribe(results => {
        this.getProjects();
        this.resetProject();
      });
  }

  deleteProject(project) {
    this.projectsService.delete(project.id)
      .subscribe(results => this.getProjects()); // rehydrate
  }

  // this is bc when loading projects async you cant select something that
  // that is not been loaded yet and the list of projects in template is not
  // showing data until you select one of them and that will fill form too
  // So list and form will be rendering bc is being initialized to an empty project using ngOnInit
  resetProject() {
    const emptyProject = {
      id: null,
      title: '',
      details: '',
      percentComplete: 0,
      approved: false,
    }
    this.selectProject(emptyProject);
  }

  // is fired when basically all of the data or
  // all of the bindings for a component has been satisfied
  // is the safest place to put something (async assingment?)
  ngOnInit() {
    this.getProjects();
    this.resetProject();
  }

}
