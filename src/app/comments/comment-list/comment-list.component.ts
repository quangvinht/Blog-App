import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  commentData: Array<Comment> = [];
  commentsLength: number = 0;
  page: number = 1;
  postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.commentsService.loadComment().subscribe((data: Comment[]) => {
      this.commentData = data.filter(
        (comment) => comment.postId === this.postId
      );

      this.commentsLength = this.commentData.length;
    });
  }
}
