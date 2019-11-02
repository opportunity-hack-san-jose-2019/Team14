import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
      email: this.email,
      password: this.password,
      first: this.firstName,
      last: this.lastName,
      cohort: '',
      location: this.location,
      phone: this.phone,
      interests: [],
      attendance: 0,
      project_score: 0,
      bonus: 0,
      total_score: 0,
      event_list: []
    }

    axios.post('http://localhost:8080', student).then(response => console.log(response.data));

    console.log(student);
  }
}
