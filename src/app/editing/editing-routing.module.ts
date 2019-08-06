import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditingListComponent } from './editing-list/editing-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditingRoutingModule { }
