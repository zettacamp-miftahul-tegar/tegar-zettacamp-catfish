import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArticleType } from './articles.type'
// import {} from '../../assets/articles'

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  // constructor() { }

  cards = [
    {
      title: 'Ice Tea',
      price: '3000',
      status: 'Like'
    },
    {
      title: 'Lemon Tea',
      price: '5000',
      status: 'Dislike'
    },
    {
      title: 'Black Coffea',
      price: '5000',
      status: 'Like'
    }
  ];

  articles: BehaviorSubject<ArticleType[]> = new BehaviorSubject<ArticleType[]>([]);

  constructor(private http: HttpClient) {
    this.fetchArticle().subscribe(data => {
      const articles: ArticleType[] = data;
      this.articles.next(articles);
    })
  }

  getArticles() {
    return this.articles.getValue();
  }

  updateLike(id: number, status: string) {
    const articles = this.articles.getValue();
    articles[id].status = status;
    this.articles.next(articles);
  }

  // updateSave(id: number, saved: boolean) {
  //   const articles = this.articles.getValue();
  //   articles[id].saved = saved;
  //   this.articles.next(articles);
  // }

  fetchArticle(): Observable<any> {
    return this.http.get('../../../assets/articles.json');
  }
}
