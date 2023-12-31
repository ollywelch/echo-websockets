import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.router.navigate(['sign-up']);
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (!username || !password) {
      return;
    }
    this.authService.login(username, password).subscribe((token) => {
      if (token) {
        this.router.navigate(['chats']);
      }
    });
  }
}
