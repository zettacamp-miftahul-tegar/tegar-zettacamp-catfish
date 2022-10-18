import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Component1Service {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions : any
  url = "https://my-json-server.typicode.com/MiftahulTegar/foods/list-foods"

  getDataFoods(){
    return this.httpClient.get(this.url, this.httpOptions)
  }
}
