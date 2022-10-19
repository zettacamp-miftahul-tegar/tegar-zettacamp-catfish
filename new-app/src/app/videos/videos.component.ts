import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  name:string = ""
  
  videos = [
    {title: 'video pertama', content: 'Warna Kuning'},
    {title: 'video kedua', content: 'Warna Kuning'},
    {title: 'video ketiga', content: 'Warna Kuning'},
    {title: 'video keempat', content: 'Warna Kuning'},
    {title: 'video kelima', content: 'Warna Kuning'}
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
