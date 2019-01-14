import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { MaterialModule } from '@workshop/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProjectsService } from '@workshop/core-data';

describe('ProjectsComponent', () => {

  // first thing to do when creating test
  // Create my local test membets

  // define component to be tested
  let component: ProjectsComponent;
  // test fixture... or component fixture
  let fixture: ComponentFixture<ProjectsComponent>; // ComponentFixture that holds the component u want to pass to test
  // debug element
  let de: DebugElement;

  let projectsService: ProjectsService;

  const mockProjectsService = {
    // mock yo self out
  }

  // most important thing
  // Instantiate test bed
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ // when u create a component or anything there needs to be a module that it lives in
      // configurations of components that it uses and what modules it relays on
      declarations: [
        ProjectDetailsComponent,
        ProjectsListComponent,
        ProjectDetailsComponent
      ],
      providers: [{provide: ProjectsService, useValue: mockProjectsService}],
      imports: [
        MaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    }).createComponent(ProjectsComponent); // instantiate the fixture

    // get the component instance
    // once we have our fixture, now it is time to have a reference
    component = fixture.componentInstance;
    de = fixture.debugElement;
    // get srrvice instance
    projectsService = de.injector.get(ProjectsService);


    fixture.detectChanges(); // this is bc angular dont do changes detection by default
  });

  // create a test
  it('should have a primaryColorPropertyBinding of `orange`', () => {
    expect(component.primaryColorPropertyBinding).toBe('orange')
  });

  it('should display primaryColorPropertyBinding', () => {
    const h1 = de.query(By.css('h1'));
    expect(h1.nativeElement.innerText).toBe('orange');
  });

  it('should display h1 to new primaryColorPropertyBinding', () => {
    const h1 = de.query(By.css('h1'));
    component.primaryColorPropertyBinding = 'black';
    fixture.detectChanges();
    expect(h1.nativeElement.innerText).toBe('black');
  })

});
