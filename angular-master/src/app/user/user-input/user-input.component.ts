import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  UserService
} from '../user.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  User
} from '../model/user.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
  
  selectedUser: User | null | undefined;
  id: any;
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  bebas : any;

  constructor(private route: ActivatedRoute, private data: UserService) {}

  ngOnInit(): void {
    // const id = parseInt(this.route.snapshot.paramMap.get('id') !, 10);
    // console.log(id)

    this.data.userList$.subscribe(data => {
      this.selectedUser = this.data.getBookById(this.id);
    })
    this.initForm();
  }
  

  initForm() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id == null;
    }

    this.signupForm = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl(''),
      'age': new FormControl(''),
      'email': new FormControl(''),
      'position': new FormControl(''),
      'status': new FormControl(''),
      'genders': new FormControl('male'),
      'address': new FormGroup({
        'address': new FormControl(''),
        'zip': new FormControl(''),
        'city': new FormControl(''),
        'country': new FormControl('')
      })
    });

    this.getData();
  }

  getData() {
    this.data.userList$.subscribe(x=> {
      this.bebas = x;
      // console.log(this.bebas);
      let user = this.bebas.filter((x: { id: any; }) => x.id == this.id);
      console.log(user); 
    })
  }
  
  onSubmit() {
    if (this.id) {
      let updateId = this.id
      let updateData = this.signupForm.value
      this.data.updateData(updateId, updateData)
    } else {
      console.log(this.signupForm);
      this.data.addUser(this.signupForm.value)
    }

  }
}
