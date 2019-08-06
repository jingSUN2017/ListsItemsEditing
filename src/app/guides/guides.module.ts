import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuidesRoutingModule } from './guides-routing.module';
import { GuideListComponent } from './guide-list/guide-list.component';


@NgModule({
  declarations: [GuideListComponent],
  imports: [
    CommonModule,
    GuidesRoutingModule
  ]
})
export class GuidesModule { }
