import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

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

    axios.post('http://localhost:8080/student/register', student)
      .then(response => console.log(response.data));

    console.log(student);
  }

}
