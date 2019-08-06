import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditingDetailComponent } from "./editing-detail/editing-detail.component";

const routes: Routes = [
  {path: 'introduction',
    loadChildren: () => import('./guides/guides.module').then(mod => mod.GuidesModule)
  },
  {path: 'editing',
    loadChildren: () => import('./editing/editing.module').then(mod => mod.EditingModule)
  },
  {
    path: 'editing/:index',
    component: EditingDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
