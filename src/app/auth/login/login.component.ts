import { Component, OnInit } from '@angular/core';
import { iLoginRequest } from '../../interfaces/i-login-request';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.login();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.form.valid) {
      const formData: iLoginRequest = this.form.value;
      this.authSvc.login(formData).subscribe(
        (data) => {
          this.router.navigate(['/home']);
          alert('Login effettuato correttamente');
        },
        (error) => {
          alert('Errore nel login: ' + error.message);
        }
      );
    }
  }
}
