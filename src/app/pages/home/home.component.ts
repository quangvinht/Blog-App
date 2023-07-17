import { Observable } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  postsFeatured: Array<Post> | undefined;
  postsLasted: any;
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.loadPost().subscribe((posts) => {
      this.postsFeatured = posts
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

        .filter((post: Post) => post.isFeatured === true)
        .slice(0, 4);
      this.postsLasted = posts

        .map((item: any) => {
          const { seconds, nanoseconds } = item.createdAt;

          return { ...item, createdAt: seconds * 1000 + nanoseconds / 1e6 };
        })
        .sort((a: any, b: any) => b.createdAt - a.createdAt)

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
        });
    });
  }
}
