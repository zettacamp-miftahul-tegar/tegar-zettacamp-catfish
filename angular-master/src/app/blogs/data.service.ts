import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Datas } from './model/data.model'
import { Actors } from './model/actors.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { 
    this.dummyInitList();
    this.dummyInitListA();
  }

  private movieList:BehaviorSubject<any> = new BehaviorSubject<any>([]);
  movieList$ = this.movieList.asObservable();

  // movie !: BehaviorSubject<any>

  private actorList = new BehaviorSubject<Datas | null>(null);
  actorList$ = this.actorList.asObservable();

  //----------------------------------

  private actorData = new BehaviorSubject<Actors[]>([]);
  actorData$ = this.actorData.asObservable();

  private actorHEY = new BehaviorSubject<Actors | null>(null);
  actorHEY$ = this.actorHEY.asObservable();

  movieDatas:any;
  actorDatas:any;

  dummyInitList() {
    this.fetchDataJson().subscribe(resp => {
      this.movieDatas = resp.movies;
      this.setAllDataLists(this.movieDatas);
      // console.log(resp)
    })
    
  }

  fetchDataJson() {
    return this.httpClient.get<any>('../../assets/data.json');
  }

  setAllDataLists(data: Datas[]) {
    this.movieList.next(data);
  }

  setSelectedData(data1: Datas) {
    this.actorList.next(data1);
  }

  // getMovieById(id: number) {
  //   console.log(id);
  //   for(let i = 0; i < this.movieDatas.length; i++) {
  //     if(this.movieDatas[i] == id){
  //       this.movie.next(this.movieDatas[i])
  //     }
  //   }
  //   return this.movie.asObservable()
  // }

  updateSelectedMovie(data:any){
    this.actorList.next(data)
  }

  getMovie(): Datas[] {
    return this.movieList.getValue()
  }

  getMovieById(id: number): Datas {
    return this.getMovie().filter(item => item.id == id)[0];
  }
  
  //---------------------

  dummyInitListA() {
    this.fetchDataJsonA().subscribe(resp => {
      this.actorDatas = resp.actors;
      this.setAllDataListsA(this.actorDatas);
      // console.log(resp)
    })
    
  }

  fetchDataJsonA() {
    return this.httpClient.get<any>('../../assets/actor.json');
  }

  setAllDataListsA(data: Actors[]) {
    this.actorData.next(data);
  }

  setSelectedDataA(data1: Actors) {
    this.actorHEY.next(data1);
  }

  updateSelectedMovieA(data:any){
    this.actorHEY.next(data)
  }

  getMovieA(): Actors[] {
    return this.actorData.getValue()
  }

  getMovieByIdA(id: number): Actors {
    return this.getMovieA().filter(item => item.id == id)[0];
  }
}
