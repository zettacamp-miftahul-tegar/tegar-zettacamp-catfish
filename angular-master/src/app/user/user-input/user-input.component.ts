import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user.model';
import { TranslateService } from '@ngx-translate/core';

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

  selectedLang = 'en';

  constructor(private route: ActivatedRoute, private data: UserService, public translateService: TranslateService) {}

  ngOnInit(): void {
    // const id = parseInt(this.route.snapshot.paramMap.get('id') !, 10);
    // console.log(id)

    this.data.userList$.subscribe(data => {
      this.selectedUser = this.data.getBookById(this.id);
    })
    this.initForm();
  }
  

  initForm() {
    // if (this.route.snapshot.params['id']) {
    //   this.id = this.route.snapshot.params['id'];
    // } else {
    //   this.id == null;
    // }

    this.signupForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'position': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'genders': new FormControl(null, Validators.required),
      'address': new FormGroup({
        'address': new FormControl(null, Validators.required),
        'zipcode': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'country': new FormControl(null, Validators.required)
      })
    });
    this.getData();
  }

  getData() {
    this.data.userList$.subscribe(x=> {
      this.bebas = x;
      // console.log(this.bebas);
      let user = this.bebas.filter((x: { id: any; }) => x.id == this.id);
      let a = this.signupForm.patchValue(user[0]);
    });
  }

  onSubmit() {
    if (this.id) {
      let updateId = this.id
      let updateData = this.signupForm.value
      this.data.updateData(updateId, updateData)
      alert('update data succes!')
    } else {
      console.log(this.signupForm);
      this.data.addUser(this.signupForm.value)
      alert('upload data succes!')
    }

  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
