import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Filter } from '../model/filter.model';
import { DataService } from '../data.service';
import {Apollo} from 'apollo-angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private data: DataService, private apollo: Apollo) { }

  searchName = new FormControl()
  dataUser: Filter[] = []

  private subs = new SubSink();

  Users:Filter[]=[]

  ngOnInit(): void {
    this.searchName.valueChanges.subscribe((search) => {
      console.log(search.length)
      if(search.length > 3 ){
        this.subs.sink = this.data.getUsers(search).subscribe(resp => {
          this.dataUser = resp.data.GetAllUsers
        })
      }
    });
  }

}