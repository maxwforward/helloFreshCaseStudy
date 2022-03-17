import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Create a form for the register page
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  })

  // Create a variable to store whether or not a new user was registered
  userRegistered = false

  // Inject the service
  constructor(private helper: HelperService) { }

  ngOnInit(): void { }

  // Create a function for user registration
  register() { 
    this.helper.registerUser(this.registerForm.value)
    this.userRegistered = true
    this.registerForm.reset()
  }
}