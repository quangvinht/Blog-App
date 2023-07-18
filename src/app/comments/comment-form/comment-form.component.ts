import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });
  }
  handleSubmitComment(commentForm: any) {
    const dateObject = new Date();

    // Lấy thông tin ngày, tháng và năm từ đối tượng Date
    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('en-US', { month: 'short' });

    const year = dateObject.getFullYear();
    const createdAt = `${month} ${day} ${year}`;

    const commentData: Comment = {
      name: commentForm.value.name,
      comment: commentForm.value.comment,
      postId: this.postId,
      createdAt: createdAt,
    };

    this.commentsService.addComment(commentData);
    commentForm.reset();
  }
}
