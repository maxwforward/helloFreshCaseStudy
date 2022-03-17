import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  
  // Create variables
  urlMenu: string = "http://localhost:3000/weeklyMenu" // url for accessing the json server
  urlUsers: string = "http://localhost:3000/users" // url for accessing the json server
  users: any = [] // array for storing the users data
  userLoggedIn = false // boolean to store whether of not a user is logged in
  updating = false // boolean to store whether not the program is taking some time to update the user
  cart: any = [] // create a variable to store the users cart

  // Inject the HttpClient to get data from a json server
  constructor(private http: HttpClient) { 
    // Get and store the users data
    this.storeUsers()
  }

  // Create a function to get the menu from the json server and return it as an observable
  getMenu(): Observable<any> {
    return this.http.get(this.urlMenu)
  }

  // Create a function to get the users from the json server and return it as an observable
  getUsers(): Observable<any> {
    return this.http.get(this.urlUsers)
  }
  
  // Create a function to get and store the users data by subscribing to an observable
  storeUsers(){
    this.getUsers().subscribe(data=> {
      this.users = data
    })
  }

  // Create a funtion to authenticate user upon login
  authenticate(form) {
    for (let i = 0; i < this.users.length; i++) {
      // If authentication succeeds
      if (form.username==this.users[i].login.username && form.password==this.users[i].login.password) {
        this.userLoggedIn = true
        localStorage.setItem('userData', JSON.stringify(this.users[i]))
      }
    }
  }

  // Create a funtion to logout user
  logoutUser() {
    this.userLoggedIn = false
    this.cart = []
    localStorage.clear()
  }

  // Create a funtion to register a new user and post the data to the json server
  registerUser(form) { 
    var newUser = { 
      firstName: form.firstName, 
      lastName: form.lastName,
      login: {
        username: form.username,
        password: form.password
      }
    }
    this.http.post(this.urlUsers, newUser).subscribe(data=> {
      console.log("User registered", data)
      this.storeUsers()
    },
    error=> {
      console.log("Error", error)
    })
  }

  // Create a function to update a user and put the data in the json server
  updateUser(form) {
    var userID = (JSON.parse(localStorage.getItem('userData'))).id
    var userURL = (this.urlUsers + "/" + userID)
    console.log(userURL)
    var updatedUserData = {
      firstName: form.firstName, 
      lastName: form.lastName,
      login: {
        username: form.username,
        password: form.password
      }
    }
    this.http.put(userURL, updatedUserData).subscribe(data=> {
      console.log("User updated", data)
      this.updating = true
      this.storeUsers()
      setTimeout(()=> {
        localStorage.setItem('userData', JSON.stringify(this.users[userID-1]))
        this.updating = false
      }, 1000)
    },
    error=> {
      console.log("Error", error)
    })
  }

  // Create a function to add to cart
  addToCart(meal) {
    this.cart.push(meal)
  }

  // Create a function to get the first name of the user that is logged in
  getFirstName(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.firstName
  }

  // Create a function to get the last name of the user that is logged in
  getLastName(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.lastName
  }

  /*
  // Create a function to get the username of the user that is logged in
  getHouseNumber(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.housenumber
  }

  // Create a function to get the password of the user that is logged in
  getStreetName(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.streetname
  }

  // Create a function to get the first name of the user that is logged in
  getCity(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.city
  }

  // Create a function to get the last name of the user that is logged in
  getState(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.state
  }

  // Create a function to get the first name of the user that is logged in
  getZip(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.zip
  }

  // Create a function to get the last name of the user that is logged in
  getCountry(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.address.country
  }
  */

  // Create a function to get the username of the user that is logged in
  getUsername(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.login.username
  }

  // Create a function to get the password of the user that is logged in
  getPassword(): string {
    var user = JSON.parse(localStorage.getItem('userData'))
    return user.login.password
  }
}