import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() postData: any | undefined;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}
  handleIncrementView() {
    this.postData = this.postsService.countViews(
      this.postData.id,
      this.postData.views
    );
  }
}
