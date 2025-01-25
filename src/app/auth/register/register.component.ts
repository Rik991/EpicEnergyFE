import { Component } from '@angular/core';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  avatarFile?: File;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatar: [null],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.avatarFile = event.target.files[0];
    }
  }

  register() {
    if (this.form.valid) {
      const formData: Partial<iUser> = {
        username: this.form.value.username,
        nome: this.form.value.nome,
        cognome: this.form.value.cognome,
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.authSvc.register(formData, this.avatarFile).subscribe({
        next: (res) => {
          this.router.navigate(['/auth/login']);
          alert('Registrazione effettuata correttamente');
        },
        error: (err) => {
          alert(
            'Errore durante la registrazione: ' +
              (err.error?.message || 'Errore sconosciuto')
          );
        },
      });
    } else {
      alert('Controlla i tuoi dati, ci sono errori nel modulo.');
    }
  }
}
