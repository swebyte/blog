import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';

interface BlogPost {
  title: string;
  created: string;
  body: string;
}

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class BlogComponent {
  private http = inject(HttpClient);
  protected posts = signal<BlogPost[]>([]);

  ngOnInit() {
    this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/blog`).subscribe((data) => {
      this.posts.set(data);
    });
  }
}
