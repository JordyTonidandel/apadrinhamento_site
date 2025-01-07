import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email, // Valida se é um email válido
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Mínimo de 8 caracteres
          Validators.pattern(/(?=.*[A-Z])/) /* Pelo menos uma letra maiúscula */,
          Validators.pattern(/(?=.*[a-z])/) /* Pelo menos uma letra minúscula */,
          Validators.pattern(/(?=.*\d)/) /* Pelo menos um número */,
          Validators.pattern(/(?=.*[@$!%*?&])/), // Pelo menos um caractere especial
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Aqui você chamará o AuthService para autenticar o usuário
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
