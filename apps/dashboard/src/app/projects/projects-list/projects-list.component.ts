import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '@workshop/core-data';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {

  // this is a property in this class that we are allowing external forces
  // or mechanisms to basically satisfy this particular property
  @Input() projects: Project[];
  @Input() readonly = false;

  // name is in past because is something that happened in the child component
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

}
