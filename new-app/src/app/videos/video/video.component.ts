import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video:any
  title : any 

  constructor() {}

  ngOnInit(): void {
    this.video = this.video;
  }

  changeTitle() {
    if(!this.title){
      this.video.content = "Warna Sukses Diganti"
      this.title = 'berubah'
    } else {
      this.title = ''
      this.video.content = 'Warna Kuning'
    }
  }

}
