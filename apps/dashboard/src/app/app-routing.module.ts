import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@workshop/ui-login';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // this is the top level not a child (different than project routing)
  exports: [RouterModule]
})
export class AppRoutingModule { }
