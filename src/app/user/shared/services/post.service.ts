import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://coding-blog-api.herokuapp.com/posts'

  constructor(private http: HttpClient) {}

  getFeed() {
    return this.http.get(this.url);
  }

}
