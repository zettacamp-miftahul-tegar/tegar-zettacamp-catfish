import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './model/blogs.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  userData:any;

  private readonly API: string = 'https://jsonplaceholder.typicode.com/'

  constructor(private http: HttpClient) { }

  dataGET(): Observable<Post[]> {
    return this.http.get<Post[]>(encodeURI(this.API + 'posts'))
  }

  dataPOST(params: {title: string, body:string}):Observable<Post> {
    let url = this.API + 'posts'
    let body = JSON.stringify(params)
    let headers = new HttpHeaders().set('Content-type', ['application/json', 'charset=UTF'])
    console.log(body);
    
    return this.http.post<Post>(encodeURI(url), body, { headers })
  }

  dataPATCH(id: string, params: {title: string, body:string}): Observable<Post> {
    let url = this.API +'posts/' + id
    let body = JSON.stringify(params)
    let headers = new HttpHeaders().set('Content-type', ['application/json', 'charset=UTF-8'])
    return this.http.patch<Post>(encodeURI(url), body, {
      headers
    })
  }
}
