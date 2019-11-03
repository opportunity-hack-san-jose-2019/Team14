import {
  Component,
  OnInit
} from '@angular/core';
import axios from 'axios';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router, NavigationExtras
} from '@angular/router';
import {
  state
} from '@angular/animations';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    console.log(this.getAuth());
    if (localStorage.getItem('user') != null) {
      axios.post('https://obscure-badlands-88487.herokuapp.com/student/signin', this.getAuth())
        .then(response => {
          if (response.status == 200) {
            this.router.navigateByUrl('/profile');
          }
        });
    }
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
      full_name: this.firstName + " " + this.lastName,
      password: window.btoa(this.password),
      email: this.email,
      cohort: 'None',
      evening: 'Tuesday',
      location: this.location,
      phone: this.phone,
      module_score: 0,
      project_score: 0,
      bonus: null,
      total_score: 0
    }

    if (!this.firstName || !this.lastName || !this.password || !this.email) {
      this.snackBar.open('All fields are required!', 'OK', {
        duration: 2000
      });
    } else {
      var path = this.isVolunteer ? 'https://obscure-badlands-88487.herokuapp.com/volunteer/register' : 'https://obscure-badlands-88487.herokuapp.com/student/register';
      axios.post(path, student)
        .then(response => {
          this.snackBar.open('Success!', 'OK', {
            duration: 2000
          });
          this.isRegistering = !this.isRegistering;
        })
        .catch(err => {
          this.snackBar.open(err, 'OK', {
            duration: 2000
          });
        });
    }
  }

  signIn() {
    var auth = {
      email: this.email,
      password: window.btoa(this.password)
    }

    var success = false;

    axios.post('https://obscure-badlands-88487.herokuapp.com/student/signin', auth)
      .then(response => {
        if (response.status == 200) {
          localStorage.setItem('user', window.btoa(auth.email + ":" + auth.password));

          this.router.navigateByUrl("/profile");
        }
      })
      .catch(err => this.snackBar.open('Wrong credentials', 'OK', {
        duration: 2000
      }));
  }

  getAuth() {
    var user = {
      email: window.atob(localStorage.getItem('user')).split(":")[0],
      password: window.atob(localStorage.getItem('user')).split(":")[1]
    }

    return user;
  }
}
