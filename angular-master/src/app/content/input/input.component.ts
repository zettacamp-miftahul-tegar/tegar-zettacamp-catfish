import { Component,Input,Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  name:string = '';

  @Input() namePerson :any;
  @Output() nameChild: EventEmitter<any>;

  constructor() { 
    this.nameChild = new EventEmitter();
  }

  ngOnInit(): void {
  }

  addName() {
    let newObject = {
      name : this.name
    }
    console.log(newObject);
    

    this.nameChild.emit(newObject)
  } 

}
