import { Component,Input,Output, OnInit, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {

  name:string = '';

  @Input() namePerson :any;
  @Output() nameChild: EventEmitter<any>;

  // menjalankan aksi sebenernya
  constructor() { 
    this.nameChild = new EventEmitter();
  }

  ngOnInit(): void {
  }

  addName() {
    let newObject = {
      name : this.name
    }

    // method buat ngirim
    this.nameChild.emit(newObject)
  } 

}
