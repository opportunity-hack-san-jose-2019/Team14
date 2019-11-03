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
  Router
} from '@angular/router';

import {
  UserService
} from './../services/user.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // Data for displaying
  @ViewChild('eventTable', {static: false}) eventTable: MatTable<any> ;
  @ViewChild('interestTable', {static: false}) interestTable: MatTable<any> ;

  user: any;
  isVolunteer = false;
  appName = 'Braven';
  objectKeys = Object.keys;
  events = [];

  API = 'https://obscure-badlands-88487.herokuapp.com';

  // Adding interests
  isAddingInterest = false;
  interestName = '';
  interestScale = 0;

  // Table columns
  displayedColumns: string[] = ['title', 'location', 'description', 'time', 'details', 'action'];

  // Interest columns
  interestColumns: string[] = ['skill_name', 'skill_level'];

  // Interest list
  interestList = [];

  // Attending Events list
  attendingEventsList = []

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.userService.getCurrentUser()
      .then(userObject => {
        this.user = userObject;
        for (var i = 0; i < this.user.event_list.length; i++) {
          axios.get(this.API + '/event/info', {
            params: {
              id: this.user.event_list[i]
            }
          }).then(response => {
            this.events.push(response.data);
            this.eventTable.renderRows();
          });
        }

        this.getAttendingEvents();
      }).catch(err => this.router.navigateByUrl('/'));

    axios.get(this.API + '/skill/all')
      .then(response => {
        this.interestList = response.data.skill;
      });

  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getAttendingEvents() {
    console.log(this.user)
    let userRole = this.userService.isStudent(this.user) ? 'students' : 'volunteers'
    axios.get(this.API + `/event/attending?email=${this.user.email}&role=${userRole}`)
      .then((events) => {
        this.attendingEventsList = events.data;
        console.log(events)
      }).catch((e) => {
        console.log(e)
      });
  }

  getAuth() {
    var user = {
      email: window.atob(localStorage.getItem('user')).split(":")[0],
      password: window.atob(localStorage.getItem('user')).split(":")[1]
    }

    return user;
  }

  addInterest() {
    var interest = {
      email: this.getAuth().email,
      skill_name: this.interestName,
      skill_level: this.interestScale
    }

    this.user.interests.unshift(interest);
    this.interestTable.renderRows();

    if (!this.interestName) {
      this.snackBar.open('All fields are required!', 'OK', {
        duration: 2000
      });
    } else {
      axios.post(this.API + '/skill/update', interest)
        .then(response => {
          this.userService.getCurrentUser().then(userObj => console.log(userObj))
          .catch(err => this.router.navigateByUrl('/'));
        });

      this.interestScale = 0;
      this.interestName = '';

      this.isAddingInterest = !this.isAddingInterest;
    }
  }

  unregister(element) {
    this.events.splice(this.events.indexOf(element), 1);
    this.eventTable.renderRows();

    // axios post to move element

    axios.post(this.API + '/event/create', element)
      .then(response => console.log(response))
      .catch(err => console.warn(err));

    var body = {
      event_id: element._id,
      user_email: this.user.email,
      user_role: this.user.interests === undefined ? 'volunteer' : 'student'
    }

    axios.post(this.API + '/event/remove', body)
      .then(response => console.log(response))
      .catch(err => console.warn(err));
  }
}