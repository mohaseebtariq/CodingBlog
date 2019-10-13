import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;

  constructor(private service: PostService) { }

  ngOnInit() {
    this.service.getFeed()
      .subscribe(post => {
        this.posts = post;
      });
  }
}
