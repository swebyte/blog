import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface BlogPostData {
  title: string;
  body: string;
}

@Component({
  selector: 'app-blog-form',
  imports: [FormsModule],
  templateUrl: './blog-form.html',
  styleUrl: './blog-form.scss',
})
export class BlogFormComponent {
  activeModal = inject(NgbActiveModal);
  private http = inject(HttpClient);

  title = '';
  body = '';
  errorMessage = '';

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
