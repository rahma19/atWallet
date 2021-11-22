import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  credentials: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get nom() {
    return this.credentials.get('nom');
  }

  get prenom() {
    return this.credentials.get('prenom');
  }

  get phone() {
    return this.credentials.get('phone');
  }
}
