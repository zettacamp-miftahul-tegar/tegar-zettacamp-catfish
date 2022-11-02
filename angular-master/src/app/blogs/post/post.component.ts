import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts : any;

  constructor(private data: BlogsService) { }

  ngOnInit(): void {
    this.data.dataGET().subscribe((res: any) => {
      this.posts = res
      console.log(res)
    })
  }

}
