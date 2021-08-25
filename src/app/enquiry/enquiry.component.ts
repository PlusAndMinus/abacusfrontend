import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  
  userIsAuthenticated = false;
  authStatusSubs: Subscription;

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getAuthStatus()
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

}
