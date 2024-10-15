import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router, private alertService: AlertService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/projects']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username, password);

      if (success) {
        this.router.navigate(['/projects']);
      } else {
        this.alertService.showError('Ups...', 'Credenciales incorrectas. Intente de nuevo.')
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.alertService.showError('Ups...', 'Faltan campos por completar.')

    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
