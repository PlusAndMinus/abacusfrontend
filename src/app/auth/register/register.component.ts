import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.register(form.value.firstname, form.value.lastname, form.value.email, form.value.password)
    form.resetForm()
  }

}
