import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // Create variables to store an array of menu items
  menu: any = []
  searchResults: any = []

  // Create a variable to store whether or not a search is being performed
  search = false

  // Create a form for the search
  searchForm = new FormGroup({
    ingredient: new FormControl('')
  })

  // Inject the service
  constructor(public helper: HelperService) { }

  ngOnInit(): void {
    // Subscribe to the observable returned by the service in order to get and store the menu data
    this.helper.getMenu().subscribe(data=> {
      this.menu = data
    })
  }

  // Create a function for performing a search
  searchMenu() { 
    for (let i = 0; i < this.menu.length; i++) {
      for (let j = 0; j < this.menu[i].ingredients.length; j++) {
        if (this.searchForm.value.ingredient == this.menu[i].ingredients[j]) {
          this.searchResults.push(this.menu[i])
        }
      }
    }
    this.search = true
  }

  // Create a function to add a meal to the cart
  addMealToCart(mealID) {
    var mealToAdd: any
    for (let i = 0; i < this.menu.length; i++) {
      if (mealID == this.menu[i].id) {
        mealToAdd = this.menu[i]
      }
    }
    this.helper.addToCart(mealToAdd)
  }
}