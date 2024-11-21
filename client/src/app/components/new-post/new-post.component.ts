import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup;
  userId!: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    this.userId = userIdParam ? userIdParam : '';

    if (!this.userId) {
      console.error('Invalid user ID');
      this.router.navigate(['/users']);
      return;
    }
  }

  createForm(): void {
    this.postForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addPost(): void {
    if (this.postForm.invalid) {
      return;
    }

    const newPost = {
      name: this.postForm.get('name')?.value,
      description: this.postForm.get('description')?.value,
      userId: this.userId,
    };

    this.loading = true;
    this.postService.addPost(newPost).subscribe(
      () => {
        this.router.navigate(['/user', this.userId, 'posts']);
        this.loading = false;
      },
      (error) => {
        console.error('Error adding post:', error);
        this.loading = false;
      }
    );
  }
}
