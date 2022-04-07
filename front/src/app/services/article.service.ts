import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/article';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [{ name: 'Pince', price: 3.44, qty: 234 }];

  constructor(private http: HttpClient) {
    this.retrieveAll();
  }

  async add(a: Article) {
    await lastValueFrom(
      this.http.post<void>('http://localhost:3000/api/articles', a)
    );
  }

  retrieveAll() {
    this.http.get<Article[]>('http://localhost:3000/api/articles').subscribe({
      next: (articles) => {
        this.articles = articles;
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
