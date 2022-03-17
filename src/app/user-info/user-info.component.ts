import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  // Create a form for editing the user info
  editInfoForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    houseNumber: new FormControl(''),
    streetName: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  })

  // Create a variable to store whether or not the user has decided to edit the info
  edit = false

  // Inject the service
  constructor(public helper: HelperService) { }

  ngOnInit(): void { 
    // Get the user info and store it when the component is loaded
    this.getInfo()
    console.log(this.edit)
  }

  // Create a function to edit the user info
  editInfo() { 
    this.edit = true
  }

  // Create a function to get the user info and store it
  getInfo() { 
    this.editInfoForm.controls.firstName.setValue(this.helper.getFirstName())
    this.editInfoForm.controls.lastName.setValue(this.helper.getLastName())
    /*
    this.editInfoForm.controls.houseNumber.setValue(this.helper.getHouseNumber())
    this.editInfoForm.controls.streetName.setValue(this.helper.getStreetName())
    this.editInfoForm.controls.city.setValue(this.helper.getCity())
    this.editInfoForm.controls.state.setValue(this.helper.getState())
    this.editInfoForm.controls.zip.setValue(this.helper.getZip())
    this.editInfoForm.controls.country.setValue(this.helper.getCountry())
    */
    this.editInfoForm.controls.username.setValue(this.helper.getUsername())
    this.editInfoForm.controls.password.setValue(this.helper.getPassword())
  }

  // Create a function to update the user info
  updateInfo() { 
    this.helper.updateUser(this.editInfoForm.value)
    setTimeout(()=> {
      this.edit = false
    }, 1200)
  }
}