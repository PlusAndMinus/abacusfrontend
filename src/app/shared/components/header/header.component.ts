import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  authStatusSubs: Subscription;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuthStatus()
    this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }

}
