import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface BlogPostData {
  title: string;
  body: string;
}

@Component({
  selector: 'app-blog-form',
  imports: [FormsModule, MarkdownComponent],
  templateUrl: './blog-form.html',
  styleUrl: './blog-form.scss',
})
export class BlogFormComponent {
  activeModal = inject(NgbActiveModal);
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  private http = inject(HttpClient);

  title = '';
  body = '';
  errorMessage = '';
  showPreview = false;

  onSubmit() {
    const blogData: BlogPostData = {
      title: this.title,
      body: this.body,
    };

    this.http.post(`${environment.apiBaseUrl}/blog`, blogData).subscribe({
      next: (response) => {
        console.log('Blog post created:', response);
        this.activeModal.close(response);
      },
      error: (error) => {
        console.error('Failed to create blog post:', error);
        this.errorMessage = 'Failed to create blog post. Please try again.';
      },
    });
  }
}
