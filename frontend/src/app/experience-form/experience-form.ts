import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ExperienceData {
  title: string;
  company: string;
  description: string;
  start_date: string;
  end_date: string | null;
}

@Component({
  selector: 'app-experience-form',
  imports: [FormsModule],
  templateUrl: './experience-form.html',
  styleUrl: './experience-form.scss',
})
export class ExperienceFormComponent {
  activeModal = inject(NgbActiveModal);
  private http = inject(HttpClient);

  title = '';
  company = '';
  description = '';
  start_date = '';
  end_date = '';
  isCurrentPosition = false;
  errorMessage = '';

  onSubmit() {
    const experienceData: ExperienceData = {
      title: this.title,
      company: this.company,
      description: this.description,
      start_date: this.start_date,
      end_date: this.isCurrentPosition ? null : this.end_date,
    };

    this.http.post(`${environment.apiBaseUrl}/experience`, experienceData).subscribe({
      next: (response) => {
        console.log('Experience created:', response);
        this.activeModal.close(response);
      },
      error: (error) => {
        console.error('Failed to create experience:', error);
        this.errorMessage = 'Failed to create experience. Please try again.';
      },
    });
  }

  onCurrentPositionChange() {
    if (this.isCurrentPosition) {
      this.end_date = '';
    }
  }
}
