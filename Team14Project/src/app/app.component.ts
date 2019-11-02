import { Component } from '@angular/core';

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
  password = '';


  toggleRegistration() {
    this.isRegistering = !this.isRegistering;
  }
}
