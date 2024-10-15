import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      const success = this.authService.register(username, password);

      if (success) {
        this.alertService.showSuccess('Felicidades', 'Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      } else {
        this.alertService.showWarning('Ups...', 'El usuario ya existe. Por favor, elige otro nombre.');
      }
    } else {
      this.registerForm.markAllAsTouched();
      this.alertService.showError('Ups..', 'Faltan campos por completar.')
    }
  }

  back() {
    this.router.navigate(['/login']);
  }
}
