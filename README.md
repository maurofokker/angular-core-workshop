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

## Concurrently

- Allows to run multiple commands concurrently. So we can run a json-server and the app server
- Install in dev mode
  `npm install concurrently --save-dev`
- Script in `package.json`
  `"server:all": "concurrently \"npm run server\" \"ng serve\"",`
