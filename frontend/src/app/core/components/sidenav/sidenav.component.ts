import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() showSidebar = false;
  @Output() showSidebarChange = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
    this.showSidebarChange.emit(false);
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
