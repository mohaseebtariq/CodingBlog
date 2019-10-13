import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:5000/posts'

  constructor(private http: HttpClient) {}

  getFeed() {
    return this.http.get(this.url);
  }

}
