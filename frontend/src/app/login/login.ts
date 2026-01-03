import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  activeModal = inject(NgbActiveModal);

  email = '';
  password = '';

  onSubmit() {
    // Handle login logic here
    console.log('Login attempt:', { email: this.email, password: this.password });
    this.activeModal.close({ email: this.email, password: this.password });
  }
}
