import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  total = 0;
  filteredTotal = 0;
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  searchTerm: string = '';
  userId!: any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    if (userIdParam) {
      this.userId = userIdParam;
      this.loadPosts(this.userId);
    }
  }

  loadPosts(userId: number): void {
    this.loading = true;
    this.userService.getListingsByUser(userId).subscribe(
      (listings) => {
        this.posts = listings;
        this.filteredPosts = this.posts;
        this.total = listings.length;
        this.filteredTotal = listings.length;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading listings:', error);
        this.loading = false;
      }
    );
  }

  onSearchChange(): void {
    const lowerCaseSearchTerm = this.searchTerm.trim().toLowerCase();
    if (lowerCaseSearchTerm === '') {
      this.filteredPosts = this.posts;
      this.filteredTotal = this.posts.length;
    } else {
      this.filteredPosts = this.posts.filter(
        (post) =>
          post.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          post.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredTotal = this.filteredPosts.length;
    }
    this.pageIndex = 1;
  }

  get paginatedPosts(): any[] {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    return this.filteredPosts.slice(startIndex, startIndex + this.pageSize);
  }

  onQueryParamsChange(params: any): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 1;
  }

  deletePost(postId: any): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter((post) => post._id !== postId);
        this.onSearchChange();
        console.log('Post deleted:', postId);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
