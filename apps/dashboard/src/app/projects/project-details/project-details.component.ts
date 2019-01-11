import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  @Input() project;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

}
