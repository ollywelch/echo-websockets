import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  hide = true;
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  submit() {
    if (!this.form.valid) {
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (!username || !password) {
      return;
    }
    this.userService
      .createUser({ username: username, password: password })
      .subscribe(() => {
        this._snackBar.open('Sign up successful! Please log in', 'Dismiss', {
          duration: 5000
        });
        this.router.navigate(['login']);
      });
  }
}
