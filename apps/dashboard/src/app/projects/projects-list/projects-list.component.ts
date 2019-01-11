import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@workshop/core-data';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  // this is a property in this class that we are allowing external forces
  // or mechanisms to basically satisfy this particular property
  @Input() projects: Project[];
  @Input() readonly = false;


  constructor() { }

  ngOnInit() {
  }

}
