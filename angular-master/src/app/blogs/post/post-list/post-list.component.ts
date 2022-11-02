import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from '../../blogs.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() post: any;

  constructor(private data: BlogsService, private router:Router) { }

  ngOnInit(): void {
  }

  selectData(){
    this.data.dataGET();
  }

  onClick(items:any){
    this.router.navigate([`other/home/${this.post.id}`])
  }

}
