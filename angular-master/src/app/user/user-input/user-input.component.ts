import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import {
  UserService
} from '../user.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  User
} from '../model/user.model';
import {
  TranslateService
} from '@ngx-translate/core';
import { first } from 'rxjs';

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
  bebas: any;

  selectedLang = 'en';
  isEdit: any;
  subcription: any;
  // 

  constructor(private route: ActivatedRoute, private data: UserService, public translateService: TranslateService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.data.userList$.subscribe(data => {
    //   this.selectedUser = this.data.getBookById(this.id);
    // })
    this.initForm();

    if (this.isEdit) {
      this.subcription = this.data.userList$
        .pipe(first((users: User[]) => users.length !== 0))
        .subscribe((users: any[]) => {
          const user: any = users.find(user => user.id === this.id);

          for (let i = 0; i < user.address.length; i++) {
            this.onAddAddress();
          }

          this.signupForm.patchValue(User);
        });
    } else {
      this.onAddAddress();
    }

  }


  initForm() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id == null;
    }

    this.signupForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'age': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'position': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'genders': new FormControl(null, Validators.required),
      'address': new FormArray([])
    });
    this.getData();
  }

  getData() {
    this.data.userList$.subscribe(x => {
      this.bebas = x;
      // console.log(this.bebas);
      let user = this.bebas.filter((x: {
        id: any;
      }) => x.id == this.id);
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

  onAddAddress() {
    let creds = this.signupForm.controls['address'] as FormArray;
    creds.push(new FormGroup({
      address: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    }));

  }

  get controls() {
    return (this.signupForm.get('address') as FormArray).controls;
  }

}
