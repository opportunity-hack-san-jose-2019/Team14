import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  MatTable
} from '@angular/material/table';

import axios from 'axios';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Observable
} from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // Data for displaying
  @ViewChild('eventTable', { static: false }) eventTable: MatTable < any > ;
  user: Object;
  isVolunteer = false;
  appName = 'Braven';
  objectKeys = Object.keys;

  // Adding interests
  isAddingInterest = false;
  interestName = '';
  interestScale = 0;

  // Table columns
  displayedColumns: string[] = ['title', 'location', 'time', 'action'];

  constructor(private router: Router) {}

  ngOnInit() {
    axios.post('https://obscure-badlands-88487.herokuapp.com/student/signin', this.getAuth())
      .then(response => {
        if(response.status == 200) {
          this.user = response.data;
          console.log(response.data);
        } else {
          this.router.navigateByUrl('/');
        }
      })
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getAuth() {
    var user = {
      email: window.atob(localStorage.getItem('user')).split(":")[0],
      password: window.atob(localStorage.getItem('user')).split(":")[1]
    }

    return user;
  }
}
