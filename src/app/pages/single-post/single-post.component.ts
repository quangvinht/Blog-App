import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPost: any;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postsService.getSinglePost(params['id']).then((post: Post) => {
        this.postData = post;
      });
      this.postsService.loadPost().subscribe((posts) => {
        this.similarPost = posts
          .map((item: any) => {
            const { seconds, nanoseconds } = item.createdAt;

            return { ...item, createdAt: seconds * 1000 + nanoseconds / 1e6 };
          })

          .map((post: any) => {
            const timestamp = post.createdAt;
            const date = new Date(timestamp);
            const monthNames = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];

            const formattedDate = `${
              monthNames[date.getMonth()]
            } ${date.getDate()} ${date.getFullYear()}`;
            return { ...post, createdAt: formattedDate };
          })
          .filter((post: any) => {
            return (
              post?.category?.category === this.postData?.category?.category &&
              post.title !== this.postData.title
            );
          });
      });
    });
  }
}
