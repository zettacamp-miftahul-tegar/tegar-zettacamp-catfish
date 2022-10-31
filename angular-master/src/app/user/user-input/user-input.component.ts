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
  first, Observable
} from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  genders = ['male', 'female'];
  position = ['Frond-End', 'Back-End', 'QA'];
  status = ['Married', 'Single']

  selectedUser!: User;
  id: any;

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

          console.log(user.address.length);

          for (let i = 0; i < user.address.length; i++) {
            this.onAddAddress();
          }

          this.signupForm.patchValue(user);
        });
    } else {
      this.onAddAddress();
    }

    this.signupForm.get('name')?.valueChanges.subscribe((value : any) => {
      const regex = /[^a-z|\s]/i;
      console.log(value);
      
      let temp : any = value;
      temp = temp?.replace(regex, '');
      this.signupForm.get('name')?.patchValue(temp, {emitEvent: false})

    });
  }


  initForm() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id == null;
    }
    this.signupForm = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'name': new FormControl(null, [Validators.required]),
      'age': new FormControl(null, [Validators.required, Validators.min(10)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'position': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required),
      'genders': new FormControl(null, Validators.required),
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


  setLanguage(lang: string) {
    this.translateService.use(lang);
  }

  get addr() {
    return this.signupForm.controls['address'] as FormArray;
  }

  onAddAddress() {
    this.addr.push(new FormGroup({
      address: new FormControl(null, Validators.required),
      zipcode: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    }));

  }

  get controls(): FormArray {
    return this.signupForm.get('address') as FormArray;
  }

  removeAddress(i: number) {
    this.controls.removeAt(i);
  }

  getErrorMessage() {
    this.signupForm.get('email')?.hasError('required')
      return 'This email is required!';
  }

  onSubmit() {
    if (this.id) {
      let updateId = this.id
      let updateData = this.signupForm.value
      if (this.signupForm.valid) {
        this.data.updateData(updateId, updateData)
        console.log('berhasil');
        Swal.fire(
          'Success to edit ',
          'Click to close',
          'success'
        )
        this.router.navigate(['/home'])

      } else {
        console.log('gagal');
        Swal.fire(
          'Failed to Edit ',
          'Click to close',
          'error'
        )
      }
    } else {
      console.log(this.signupForm);
      if (this.signupForm.valid) {
        this.data.addUser(this.signupForm.value)
        console.log('berhasil');
        Swal.fire(
          'Success to Upload User',
          'Click to close',
          'success'
        )
        this.router.navigate(['/home'])

      } else {
        console.log('gagal');
        Swal.fire(
          'Failed to Upload',
          'Click to close',
          'error'
        )
      }
    }

  }

}
