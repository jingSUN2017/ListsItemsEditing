import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  toDoList: AngularFireList<any>;
  doneList: AngularFireList<any>;

  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('titles');
    return this.toDoList;
  }

  getDoneList() {
    this.doneList = this.firebasedb.list('done');
    return this.doneList;
  }

  addTodoTitle(title: string) {
    if(title === '' || title===null){
      console.log("input todo is empty")
      return;
    }
    this.toDoList.push({
      title: title,
      isCheck: true
    });
  }

  addDoneTitle(title: string) {
    if(title === '' || title===null){
      console.log("input done is empty")
      return;
    }
    this.doneList.push({
      title: title,
      isCheck: true
    });
  }

  checkOrUnCheckTodoTitle($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag});
  }

  checkOrUnCheckDoneTitle($key: string, flag: boolean) {
    this.doneList.update($key, {isChecked: flag});
  }

  updateTodoTitle($key: string, input: string) {
    this.toDoList.update($key, {title: input});
  }

  removeTodoTitle($key: string) {
    this.toDoList.remove($key);
  }

  removeDoneTitle($key: string) {
    this.doneList.remove($key);
    console.log($key + 'removed');
  }
}
