import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';

@Component({
  selector: 'app-editing-detail',
  templateUrl: './editing-detail.component.html',
  styleUrls: ['./editing-detail.component.css']
})
export class EditingDetailComponent implements OnInit {
  temp: string;
  submitted = false;
  display: string = 'block';
  messageForm: FormGroup;
  task: any;
  toDoListArray: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fetchData: DataService,
    private location: Location,
    private formBuilder: FormBuilder
  ){
    this.messageForm = this.formBuilder.group({
      edit: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const index = +this.route.snapshot.paramMap.get('index');

    this.fetchData.getToDoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });
        console.log(index);
        this.task = this.toDoListArray[index];
        this.temp = this.task.title;
      });
  }


  onEdit($key: string, input: string){
    this.fetchData.updateTodoTitle($key, input);
    this.submitted = true;

    setTimeout(function() {
      (<HTMLElement>document.querySelector('.edit-input')).style.display = 'none';
    }, 1500);

    if(this.messageForm.invalid){
      return;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
