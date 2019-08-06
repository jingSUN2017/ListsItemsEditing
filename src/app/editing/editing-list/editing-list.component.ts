import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../shared/data.service";
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-editing-list',
  templateUrl: './editing-list.component.html',
  styleUrls: ['./editing-list.component.css']
})
export class EditingListComponent implements OnInit {

  toDoListArray: any[] = [];
  doneListArray: any[] = [];
  keyValue: string;
  titleValue: string;
  isTodoCheckedOrNot: boolean = false;
  isDoneCheckedOrNot: boolean = false;
  messageTodoForm: FormGroup;
  messageDoneForm: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.messageTodoForm = this.formBuilder.group({
      input: ['', Validators.required]
    });

    this.messageDoneForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.dataService.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
      });

    this.dataService.getDoneList().snapshotChanges()
      .subscribe(item => {
        this.doneListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.doneListArray.push(x);
        });
      });
  }

  onAddTodo(itemTitle: HTMLInputElement) {
    this.dataService.addTodoTitle(itemTitle.value);
    itemTitle.value = null;
  }

  onAddDone(itemTitle: HTMLInputElement) {
    this.dataService.addDoneTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterTodoCheck($key: string, isChecked: boolean) {
    this.dataService.checkOrUnCheckTodoTitle($key, !isChecked);
  }

  alterDoneCheck($key: string, isChecked: boolean) {
    this.dataService.checkOrUnCheckDoneTitle($key, !isChecked);
  }

  onSelectAllTodo(){
    if(this.isTodoCheckedOrNot === false){
      this.isTodoCheckedOrNot = true;
      for(var i = 0; i < this.toDoListArray.length; i++){
        this.dataService.checkOrUnCheckTodoTitle(this.toDoListArray[i].$key, true);
      }
    }else{
      this.isTodoCheckedOrNot = false;
      for(var i = 0; i < this.toDoListArray.length; i++){
        this.dataService.checkOrUnCheckTodoTitle(this.toDoListArray[i].$key, false);
      }
    }
  }

  onSelectAllDone(){
    if(this.isDoneCheckedOrNot === false){
      this.isDoneCheckedOrNot = true;
      for(var i = 0; i < this.doneListArray.length; i++){
        this.dataService.checkOrUnCheckDoneTitle(this.doneListArray[i].$key, true);
      }
    }else{
      this.isDoneCheckedOrNot = false;
      for(var i = 0; i < this.doneListArray.length; i++){
        this.dataService.checkOrUnCheckDoneTitle(this.doneListArray[i].$key, false);
      }
    }
  }

  onTodoDeleteAll(){
    if(this.isTodoCheckedOrNot === true){
      for(var i = 0; i < this.toDoListArray.length; i++) {
        if(this.toDoListArray[i].isChecked === true){
          this.dataService.removeTodoTitle(this.toDoListArray[i].$key);
        }
      }
      this.isTodoCheckedOrNot = false;
    }
  }

  onDoneDeleteAll(){
    if(this.isDoneCheckedOrNot === true){
      for(var i = 0; i < this.doneListArray.length; i++) {
        if(this.doneListArray[i].isChecked === true){
          this.dataService.removeDoneTitle(this.doneListArray[i].$key);
        }
      }
      this.isDoneCheckedOrNot = false;
    }
  }

  onTodoSwitchAll(){
    if(this.isTodoCheckedOrNot === true){
      for(var i = 0; i < this.toDoListArray.length; i++) {
        if(this.toDoListArray[i].isChecked === true){
          this.dataService.addDoneTitle(this.toDoListArray[i].title);
          this.dataService.removeTodoTitle(this.toDoListArray[i].$key);
        }
      }
      this.isTodoCheckedOrNot = false;
    }
  }

  onDoneSwitchAll(){
    if(this.isDoneCheckedOrNot === true){
      for(var i = 0; i < this.doneListArray.length; i++) {
        if(this.doneListArray[i].isChecked === true){
          this.dataService.addTodoTitle(this.doneListArray[i].title);
          this.dataService.removeDoneTitle(this.doneListArray[i].$key);
        }
      }
      this.isDoneCheckedOrNot = false;
    }
  }

  onTodoDelete($key: string) {
    this.dataService.removeTodoTitle($key);
  }

  onDoneDelete($key: string) {
    this.dataService.removeDoneTitle($key);
  }

  drop(event: CdkDragDrop<any>, panel, $key: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      if(panel === 'done'){
        this.keyValue = (event.container.data[event.currentIndex]).$key;
        this.dataService.removeTodoTitle(this.keyValue);
        this.titleValue = (event.container.data[event.currentIndex]).title;
        this.dataService.addDoneTitle(this.titleValue);
      }else if(panel === 'todo'){
        this.keyValue = (event.container.data[event.currentIndex]).$key;
        this.dataService.removeDoneTitle(this.keyValue);
        this.titleValue = (event.container.data[event.currentIndex]).title;
        this.dataService.addTodoTitle(this.titleValue);
      }
    }
  }

}
