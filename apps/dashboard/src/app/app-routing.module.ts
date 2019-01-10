import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // this is the top level not a child (different than project routing)
  exports: [RouterModule]
})
export class AppRoutingModule { }
