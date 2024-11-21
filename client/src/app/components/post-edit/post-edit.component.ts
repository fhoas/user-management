import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
})
export class PostEditComponent implements OnInit {
  postForm!: FormGroup;
  postId!: any;
  loading = true;
  post: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('id');
    if (postIdParam) {
      this.postId = postIdParam;
      this.loadPost();
    } else {
      this.loading = false;
      console.error('Post ID is missing');
    }
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe(
      (post) => {
        this.post = post;
        this.postForm.patchValue({
          name: post.name,
          description: post.description,
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error loading post:', error);
        this.loading = false;
      }
    );
  }

  updatePost(): void {
    if (this.postForm.invalid) {
      return;
    }

    this.postService.updatePost(this.postId, this.postForm.value).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error updating post:', error);
      }
    );
  }
}
