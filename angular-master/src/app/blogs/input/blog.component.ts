import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { BlogsService } from '../blogs.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  id: any;
  signupForm!: FormGroup;
  bebas: any;
  upDate!: { title: string; body: string; };
  payload!: { title: string; body: string; };

  constructor(private router: Router,private route: ActivatedRoute, private data: BlogsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
    } else {
      this.id == null;
    }
    this.signupForm = new FormGroup({
      'userId': new FormControl(null, Validators.required),
      'id': new FormControl(null, [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'body': new FormControl(null, [Validators.required]),

    });

    this.getData();
  }

  getData() {
    this.data.dataGET().subscribe(x => {
      this.bebas = x;
      let user = this.bebas.filter((x: {
        id: any;
      }) => x.id == this.id);
      let a = this.signupForm.patchValue(user[0]);
    });
  }

  onSubmit() {
    if (this.id) {
      if (this.signupForm.valid) {

        this.id = this.id
        this.upDate = this.signupForm.value

        this.data.dataPATCH(this.id, this.upDate).subscribe((res: any) => {

          this.signupForm.patchValue(res)
        
          console.log('berhasil');

        Swal.fire(
          'Success to edit ',
          'Click to close',
          'success'
        )
        // this.router.navigate(['/other'])
       });  
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

        this.payload = this.signupForm.value
        
        this.data.dataPOST(this.payload).subscribe((res: any) => {

          this.signupForm.patchValue(res)
        
          console.log('berhasil');

        Swal.fire(
          'Success to Upload User',
          'Click to close',
          'success'
        )
        // this.router.navigate(['/other'])
      });
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