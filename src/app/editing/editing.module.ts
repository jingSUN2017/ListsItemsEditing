import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditingRoutingModule } from './editing-routing.module';
import { EditingListComponent } from './editing-list/editing-list.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [EditingListComponent],
  imports: [
    CommonModule,
    EditingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class EditingModule { }
