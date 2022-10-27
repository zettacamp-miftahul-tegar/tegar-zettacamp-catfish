import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service'
import { User } from '../model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  @Input() user: any;

  selectedUser: User | null | undefined;

  constructor(private route: ActivatedRoute, private data: UserService) { }
  
  ngOnInit(): void {

    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    console.log(id)

    this.data.userList$.subscribe(data => {
      this.selectedUser = this.data.getBookById(id);
    })
  }

  // genders = ['male', 'female']

  // signupForm = new FormGroup({
  //   'name': new FormControl(null),
  //   'age': new FormControl(null),
  //   'email': new FormControl(null),
  //   'position': new FormControl(null),
  //   'marital_status': new FormControl(null),
  //   'genders': new FormControl('male'),
  //   'address': new FormGroup({
  //     'address': new FormControl(null),
  //     'zip': new FormControl(null),
  //     'city': new FormControl(null),
  //     'country': new FormControl(null)
  //   })
  // });

  // onSubmit() {
  //   console.log(this.signupForm);
  // }
}