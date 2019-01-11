# Angular Core Workshop

We are going to use the Angular CLI and NRWL Extensions extensively in the workshop to streamline development and free us up to focus on core concepts.

Follow the steps below to get started!

## The Stack

### NRWL Workspace
A NRWL workspace contains one or all of you Angular projects and libraries. It creates a monorepo for your applications domains. Nx helps add extra layer of tooling that can help manage your enterprise applications.

### Angular Material
Angular Material is a UI library for Angular that gives you access to a modern material UI that works across web, mobile, and desktop applications with minimal custom CSS and setup.

### JSON Server
Creates a quick and simple way to mock out a backend REST service. We can then deliver some mocked out data in JSON format to make sure everything is working as expected once our real backend is connected.

## Getting Started

An Nx workspace is an Angular CLI project that has been enhanced to be enterprise ready. Being an Angular CLI project means it will be handy to have the Angular CLI installed globally, which can be done via npm or yarn as well.

```
npm install -g @angular/cli
```

> Note: If you do not have the Angular CLI installed globally you may not be able to use ng from the terminal to run CLI commands within the project. But the package.json file comes with npm scripts to run ng commands, so you can run npm start to ng serve and you can run npm run ng <command> to run any of the ng commands.

After you have installed the Angular CLI, install `@nrwl/schematics`.

```
npm install -g @nrwl/schematics
```

After installing it you can create a new Nx workspace by running:

```
create-nx-workspace angular-core-workshop
```

Lastly, please install the npm dependencies by running:
```
npm install
```
You are good to go!

## Configuración de workspace y creación de aplicación dentro de él

- La creación del workspace se hace con `create-nx-workspace angular-core-workshop` pero en este caso ya está creado (es el repo clonado)
- Cambiar en archivo `nx.json` el nombre del npmScope a "workshop" (inicialmente es angular-core-workshop) 
- Cambiar configuración de schematics en `angular.json` lo hace automaticamente al escribir:
	`ng config schematics.@nrwl/schematics:component.styleext scss`

- Crear una nueva app dentro del workspace
  `$ ng g app dashboard --routing -p=app --style=scss --dry-run`
  * `--routing` : permitirá agregar routing a la aplicación de manera instantanea, en una SPA no es necesario ponerlo por ejemplo
  * `-p=app`: permite configurar el prefijo del selector (selector: 'app-componente')
  * `--style=scss`: para poner estilos
  * `--dry-run`: permite correr una simulación asi validar que nombres y ubicaciones están bien (tb se puede usar -d)
- Una vez que se asegure que la configuración es la correcta se corre el comando sin --dry-run
  * Generará un proyecto nuevo dentro del directorio `apps` del workspace. También generará un proyecto e2e asociado a la nueva aplicación
  * El proyecto generado tendrá la estructura propia de una app angular
  * El proyecto (app) será agregado a las dependencias del workspace dentro del archivo `nx.json` y `angular.json`
- Dentro del workspace al hacer `npm start` iniciará la aplicación
- Pasar lo que está en `RESOURCES` a style en `app/dashboard` y los `assets` (imagenes)

## Angular material como modulo compartido en workspace

- Agregar al repo angular material porque sino fallará en encontrar los componentes asociados en el style `ng add @angular/material`
- Agregar angular material como un modulo en `libs` para que pueda ser importado por cada aplicación dentro del workspace en lugar de instalarlo
  `$ ng g libs material` y seleccionar opciones por defecto
  * Luego de que se creen los archivos en directorio `libs` y otros en `apps/dashboard` se debe modificar `./libs/material/src/index.ts` para que no exporte todo con *
  `export { MaterialModule } from './libs/material.module'
  * Editar archivo `material.module.ts` para importar modulos asociados a material que serán ocupados y también exportarlos
  * Para utilizar esto desde una aplicación en el workspace, dentro del archivo `app.module.ts` de la aplicación se debe importar `MaterialModule` desde namespace del workspace (`import { MaterialModule } from '@workshop/material';`)

## Creación de componentes UI

* Primero crea una lib que tendrá lógica negocio compartida por aplicaciones locales del workspace
	`ng g lib core-data -d` sacar el -d para que se escriba la generación
* Crear lib que permita compartir en aplicaciones locales cosas asociadas al UI como un login, header, footer, etc
	`ng g lib ui-login -p=ui`
	`ng g lib ui-toolbar -p=ui`

## Creación de componente con routing (feature components)

Si se está generando un componente de tipo feature, que es un componente de nivel superior que contendrá cosas adicionales, se debe considerar algunas cosas:
- habrá un route hacia este componente?
- es este feature lo suficientemente distinto que garantiza su propio route (propia ruta)?
Lo anterior calzaría con un componente feature (feature component) y cuando es así, lo ideal es primero generar un módulo y luego ponerlo en el componente. Ejemplo
	`ng g m home --routing`: generará el módulo home pero también la habilidad de enrutar hacia él
	`ng g c home`: ahora genera el componente

- Generar feature projects
	`ng g m projects --routing`: generará el módulo home pero también la habilidad de enrutar hacia él
	`ng g c projects`: ahora genera el componente

- Generar feature customers
	`ng g m customers --routing`: generará el módulo home pero también la habilidad de enrutar hacia él
	`ng g c customers`: ahora genera el componente

* Se debe recordar importar los módulos creados en el scope de la aplicación dashboard o sea en archivo `app.module.ts`
* Al usar los componentes en el padre `app.component.html` se debe considerar que los componentes se deben exportar dentro de su propio modulo `xxx.module.ts` ejemplo `home.module.ts` agregar como `exports`

## Services

To generate services with `angular-cli`
  `ng g s projects/projects --project=core-data`
  - `ng g`: angular client generate
  - `s`: service
  - `projects/projects`: in folder projects create service projects
  - `--project=code-data`: inside shared lib core-data project

## Interfaces

To generate interfaces with `angular-cli`
  `ng g i projects/project --project=core-data`
  - `ng g`: angular client generate
  - `i`: interface
  - `projects/project`: in folder projects create singular interface project
  - `--project=code-data`: inside shared lib core-data project  

## Concurrently execution

- Allows to run multiple commands concurrently. So we can run a json-server and the app server
- Install in dev mode
  `npm install concurrently --save-dev`
- Script in `package.json`
  `"server:all": "concurrently \"npm run server\" \"ng serve\"",`

## Forms

1. Hook form in a submit
  ```html
  <form (submit)="saveProject(selectedProject)">
    <mat-card-content>
      <!-- PROJECT FORM HERE -->
      <!-- <pre>{{selectedProject | json}}</pre> -->
      <mat-form-field class="full-width">
        <input matInput placeholder="Title" [(ngModel)]="selectedProject.title" type="text" name="title">
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button type="submit" mat-button color="primary">Save</button>
      <button type="button" mat-button (click)="cancel()">Cancel</button>
    </mat-card-actions>
  </form>
  ```
2. Material Forms
   - [form fields](https://material.angular.io/components/form-field/overview)
   - [form slider](https://material.angular.io/components/slider/overview)
   - [form checkbox](https://material.angular.io/components/checkbox/overview)

## Shared mutable state problem

* Problem until commit `81bd82f` is that when something is typed in the form (title and detail) it will update the form title and the project selected in the list of projects this is the shared mutable state problem.
  * You have for instance, and object in a service that you are passing by reference across two components, and component A need that this object can never go up to past 10, but then component B turn this object to 11... that is a problem
* Solution: Ver Arquitectura de componentes
  - Si quieres compartir estado, que sea inmutable
  - Si necesitas mutar estado, entonces aislalo para que no pueda ser compartido
  - Creando un nuevo objeto a partir del que se desea mutar
  ```typescript
  export class ProjectDetailsComponent {

    currentProject: Project;
    originalTitle;

    @Output() saved = new EventEmitter();
    @Output() cancelled = new EventEmitter();

    // using setter
    @Input() set project(value) {
      if (value) this.originalTitle = value.title;
      this.currentProject = Object.assign({}, value)
    }
  }
  ```


## Arquitectura de componentes

- Se refiere a cómo se estructuran los componentes
- Uso de property y event binding customizados (`@Input()` y `@Output()`)
- Lo anterior permite estructurar en componentes hijos y componentes padres y pasar datos entre ellos
- `Container Component` sería uno padre y `Presentation Component` un hijo, la lógica debiera estar en uno padre
- `Componente de presentación`: componente diseñado para presentación y capturando eventos y delegarlos hacia arriba (padre)
- `Componente contenedor`: se encarga de los detalles de implementación de dónde proviene los datos y para controlar los eventos que le lleguen para delegarlos con fuentes externas. En funcion del estado de la aplicación.
- Los componentes tienen dos responsabilidades principales
  1. Consumir los datos que necesita para satisfacer el template
  2. Capturar eventos a nivel de componente o local, o capturarlos local y luego enviarlos al padre

### Generar componentes con angular-cli

- Comando:
  `ng g c projects/projects-list`
  * `ng g`: genera
  * `c`: componente
  * `projects/project-list`: dentro de directorio `projects` genera componente `project-list`

### @Input()

- Permite pasar data desde un componente padre `projects.component.ts` a uno hijo `projects-list.component.ts`
- Utiliza el método `property binding`
- Componente hijo `projects-list.component.ts`
  ```typescript
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
  ```
- Template hijo `projects-list.component.html`
  ```html
  <!-- <pre>{{projects | json}}</pre>  -->
  <mat-card>
    <mat-card-header>
      <mat-card-title>
        <h1>Projects</h1>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <!--
      <pre>{{projects | json}}</pre>
      -->
      <mat-list>
        <mat-list-item  *ngFor="let project of projects">
          <h3  mat-line>
            <!-- PROJECT DETAILS -->
            {{project.title}}
          </h3>
          <p mat-line>
            <!-- PROJECT DETAILS -->
            {{project.details}}
          </p>
          <!-- after call deleteProject(project) it calls $event.stopImmediatePropagation() -->
          <!-- bc if not it will bubble up and do the (click)="selectProject(project)" above in list -->
          <button *ngIf="!readonly" mat-icon-button >
            <mat-icon>close</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
  ```
- Componente padre `projects.component.ts`
  ```typescript
  @Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
  })
  export class ProjectsComponent implements OnInit {

    // any property declaration is available to be bound to the template
    // by convention observable streams use $ sufix
    projects$; //: Observable<Project[]>;
    // more code
  }
  ```
- Template padre `projects.component.html` usando `property binding` hacia componente hijo (en `@Input()`)
  ```html
  <div class="container">
    <!-- PROJECTS LIST -->
    <div class="col-50">
      <app-projects-list [projects]="projects$ | async"></app-projects-list>
    </div>
    <!-- PROJECT DETAILS -->
  </div>
  ```

### @Output()

- Permite pasar data desde un componente hijo  `projects-list.component.ts` a uno padre  `projects.component.ts`
  - Por ejemplo en el caso de que ocurre un evento en el componente de presentación y se debe pasar al componente padre para que realice la lógica
- Utiliza el método customizado `event binding`
- Al crear un `output` se inicializa como un nuevo `EventEmitter`
- Componente hijo
  ```typescript
  export class ProjectsListComponent {

    // this is a property in this class that we are allowing external forces
    // or mechanisms to basically satisfy this particular property
    @Input() projects: Project[];
    @Input() readonly = false;

    // name is in past because is something that happened in the child component
    @Output() selected = new EventEmitter();
    @Output() deleted = new EventEmitter();

  }
  ```
- Template hijo
  ```html
  <mat-card>
    <mat-card-header>
      <mat-card-title>
        <h1>Projects</h1>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <!--
      <pre>{{projects | json}}</pre>
      -->
      <mat-list>
        <mat-list-item
          *ngFor="let project of projects"
          (click)="selected.emit(project)"
        >
          <h3  mat-line>
            <!-- PROJECT DETAILS -->
            {{project.title}}
          </h3>
          <p mat-line>
            <!-- PROJECT DETAILS -->
            {{project.details}}
          </p>
          <!-- after call deleteProject(project) it calls $event.stopImmediatePropagation() -->
          <!-- bc if not it will bubble up and do the (click)="selectProject(project)" above in list -->
          <button
            *ngIf="!readonly" mat-icon-button
            (click)="deleted.emit(project);$event.stopImmediatePropagation()"
          >
            <mat-icon>close</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
  ```
- Componente padre
  ```typescript
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

    deleteProject(project) {
      this.projectsService.delete(project.id)
        .subscribe(results => this.getProjects()); // rehydrate
    }

    // other methods and implementations

  }
  ```
- Template padre
  ```html
  <div class="col-50">
    <app-projects-list
      [projects]="projects$ | async"
      (selected)="selectProject($event)"
      (deleted)="deleteProject($event)">
    </app-projects-list>
  </div>
  ```
