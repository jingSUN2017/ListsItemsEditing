import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideListComponent } from "./guide-list/guide-list.component";


const routes: Routes = [
  {
    path: '',
    component: GuideListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
