import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  body: string;
  user_id: string;
}

@Component({
  selector: 'app-blog-detail',
  imports: [DatePipe],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
})
export class BlogDetailComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected authService = inject(AuthService);
  protected post = signal<BlogPost | null>(null);
  protected loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBlogPost(Number(id));
    } else {
      this.router.navigate(['/blog']);
    }
  }

  loadBlogPost(id: number) {
    this.loading.set(true);
    this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/blog?id=eq.${id}`).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.post.set(data[0]);
        } else {
          console.error('Blog post not found');
          this.router.navigate(['/blog']);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load blog post:', error);
        this.loading.set(false);
        this.router.navigate(['/blog']);
      },
    });
  }

  deleteBlogPost() {
    const postId = this.post()?.id;
    if (!postId) return;

    if (confirm('Are you sure you want to delete this post?')) {
      this.http.delete(`${environment.apiBaseUrl}/blog?id=eq.${postId}`).subscribe({
        next: () => {
          console.log('Blog post deleted');
          this.router.navigate(['/blog']);
        },
        error: (error) => {
          console.error('Failed to delete blog post:', error);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}
