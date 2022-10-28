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
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  User
} from '../model/user.model';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  first
} from 'rxjs';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  selectedUser!: User;
  id: any;
  genders = ['male', 'female'];
  signupForm!: FormGroup;
  bebas: any;

  selectedLang = 'en';
  isEdit: boolean = false;
  subcription: any;


  constructor(private route: ActivatedRoute, private data: UserService, public translateService: TranslateService, private fb: FormBuilder, private router: Router, ) {}

  ngOnInit(): void {
    // this.data.userList$.subscribe(data => {
    //   this.selectedUser = this.data.getBookById(this.id);
    // })
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = id != null;

    console.log(this.isEdit);
    console.log(id);


    if (this.isEdit) {
      this.subcription = this.data.userList$
        .pipe(first((items) => items.length !== 0))
        .subscribe((items) => {
          const user: any = items.find(items => {
            console.log(items);
            console.log(id);
            
            return items.id == this.id
          });

          console.log(user);

          for (let i = 0; i < user.address.length; i++) {
            this.onAddAddress();
          }

          this.signupForm.patchValue(user);
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
      'id': this.fb.control(null, Validators.required),
      'name': this.fb.control(null, Validators.required),
      'age': this.fb.control(null, Validators.required),
      'email': this.fb.control(null, Validators.required),
      'position': this.fb.control(null, Validators.required),
      'status': this.fb.control(null, Validators.required),
      'genders': this.fb.control(null, Validators.required),
      'address': this.fb.array([])
    });
    this.getData();
  }

  getData() {
    this.data.userList$.subscribe(x => {
      this.bebas = x;
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
      this.router.navigate(['/home']);
    } else {
      console.log(this.signupForm);
      this.data.addUser(this.signupForm.value)
      alert('upload data succes!')
      this.router.navigate(['/home']);
    }

  }


  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  get addr() {
    return this.signupForm.controls['address'] as FormArray;
  }

  onAddAddress() {
    this.addr.push(new FormGroup({
      address: this.fb.control(null, Validators.required),
      zipcode: this.fb.control(null, Validators.required),
      city: this.fb.control(null, Validators.required),
      country: this.fb.control(null, Validators.required)
    }));

  }

  get controls(): FormArray {
    return this.signupForm.get('address') as FormArray;
  }

  removeAddress(i: number) {
    this.controls.removeAt(i);
  }

}
