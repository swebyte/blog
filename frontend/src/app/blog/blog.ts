import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { BlogFormComponent } from '../blog-form/blog-form';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

interface BlogPost {
  title: string;
  created_at: string;
  body: string;
}

@Component({
  selector: 'app-blog',
  imports: [DatePipe],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class BlogComponent {
  private http = inject(HttpClient);
  private modalService = inject(NgbModal);
  protected authService = inject(AuthService);
  protected posts = signal<BlogPost[]>([]);

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/blog?order=created_at.desc`).subscribe({
      next: (data) => {
        this.posts.set(data);
      },
      error: (error) => {
        console.error('Failed to load blog posts:', error);
      },
    });
  }

  openNewBlogModal() {
    const modalRef = this.modalService.open(BlogFormComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.result.then(
      (result) => {
        console.log('Blog post created:', result);
        this.loadBlogPosts();
      },
      (reason) => {
        console.log('Modal dismissed');
      }
    );
  }
}
