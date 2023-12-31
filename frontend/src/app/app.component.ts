import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showSidebar = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
    this.showSidebar = false;
  }

  getLinks(): Array<{ action: () => void; title: string }> {
    const links = [
      {
        action: () => {
          this.goTo('messages');
        },
        title: 'Messages'
      }
    ];

    if (this.authService.token) {
      links.push({
        action: () => {
          this.authService.logout();
        },
        title: 'Log out'
      });
    } else {
      links.push({
        action: () => {
          this.goTo('login');
        },
        title: 'Log in'
      });
      links.push({
        action: () => {
          this.goTo('sign-up');
        },
        title: 'Sign up'
      });
    }
    return links;
  }
}
