import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  appName = 'Braven';

  isVolunteer = false;
  isRegistering = true;

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  location = '';
  password = '';


  toggleRegistration() {
    this.isRegistering = !this.isRegistering;
  }

  signUp() {
    var student = {
      first: this.firstName,
      last: this.lastName,
      password: this.password,
      email: this.email
    }

    if(!this.firstName || !this.lastName || !this.password || !this.email) {
      this.snackBar.open('All fields are required!', 'OK', {
        duration: 2000
      });
    } else {
      axios.post('https://obscure-badlands-88487.herokuapp.com/student/register', student)
      .then(response => console.log(response.data));
    }

    console.log(student);
  }
}