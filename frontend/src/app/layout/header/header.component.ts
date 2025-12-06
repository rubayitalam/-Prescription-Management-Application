import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = '';

  constructor(private authService: AuthService) {
    const user = this.authService.getUserInfo();
    if (user) {
      this.username = user.username;
    }
  }

  logout() {
    this.authService.logout();
  }
}
