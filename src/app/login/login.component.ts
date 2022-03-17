import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Create a form for the login page
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  // Create a variable to store whether or not a wrong username/passowrd was entered when trying to log in
  loginFailed = false

  // Inject the service and router 
  constructor(public helper: HelperService, private router: Router) { }

  ngOnInit(): void { }

  // Create a function for user login
  login(){
    this.helper.authenticate(this.loginForm.value)
    // If user is logged in, route to home component
    if (this.helper.userLoggedIn) {
      this.loginFailed = false
      this.router.navigate(['/'])
    }
    // If login fails
    else {
      this.loginFailed = true
    }
  }
}