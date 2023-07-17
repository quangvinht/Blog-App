import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  idCategory: string = '';
  categoryTitle: string = '';
  postsCategory: Array<Post> | undefined;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryTitle = params['category'];

      this.idCategory = params['id'];
      this.postsService.loadPost().subscribe((posts) => {
        this.postsCategory = posts
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
          .filter((post: Post) => post?.category?.categoryId === this.idCategory);
      });
    });
  }
}
