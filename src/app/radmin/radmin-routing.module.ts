import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadminComponent } from './radmin.component';


const routes: Routes = [
  {path: 'admin', component: RadminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadminRoutingModule { }
