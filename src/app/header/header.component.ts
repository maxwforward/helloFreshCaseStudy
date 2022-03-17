import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Inject the service and router 
  constructor(public helper: HelperService, private router: Router) { }

  ngOnInit(): void { 
    // Clear the local storage so that no user is logged in when the component is loaded
    localStorage.clear()
  }

  // Create a function for logout functionality
  logout() { 
    this.helper.logoutUser()
    this.router.navigate(['/'])
  }
}