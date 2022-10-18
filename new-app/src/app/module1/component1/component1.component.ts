import { Component, OnInit } from '@angular/core';
import { Component1Service } from './component1.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {

  constructor(
    private Component1Service : Component1Service
  ) { }

  dataFoods : any
  columnTable = ['ID','Nama', 'Harga', 'Edit', 'Hapus']
  titlePage = 'List Foods'
  
  ngOnInit(): void {
    this.getDataFoods()
  }

  getDataFoods(){
    this.Component1Service.getDataFoods().subscribe(res => {
      this.dataFoods = res
      console.log(res)
    })
  }

}
