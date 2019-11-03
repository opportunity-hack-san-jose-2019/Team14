import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @ViewChild('eventTable', {static: false}) eventTable: MatTable<any>;

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  volunteers: any;

  ngOnInit() {
    if(this.getAuth().username != 'Admin' || this.getAuth().password != 'Admin') {
      this.router.navigateByUrl('/');
    }

    axios.get('https://obscure-badlands-88487.herokuapp.com/volunteer/all')
      .then(response => {
        this.volunteers = response.data.volunteers;
        console.log(response.data.volunteers);
      })
      .catch(err => this.snackBar.open(err));
  }

  events = [
    {
      title: 'Mentor event',
      location: 'San Jose',
      time: '6.00pm November 10'
    },
    {
      title: 'Member event',
      location: 'SF',
      time: '3.00pm November 17'
    }
  ];

  eventTitle = '';
  eventLocation = '';
  eventTime = '';

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  deleteEvent(event) {
    this.events.splice(this.events.indexOf(event), 1);
    this.eventTable.renderRows();
  }

  addEvent() {
    var event = {
      title: this.eventTitle,
      location: this.eventLocation,
      time: this.eventTime
    }

    console.log(event);

    if(!this.eventTable || !this.eventLocation || !this.eventTime) {
      this.snackBar.open('All fields are required!', 'OK', {
        duration: 2000
      });
    } else {
      this.events.unshift(event);
      this.eventTable.renderRows();
      this.eventTitle = '';
      this.eventLocation = '';
      this.eventTime = '';
    }
  }

  displayedColumns: string[] = ['title', 'location', 'time', 'action'];

  getAuth() {
    var auth = {
      username: window.atob(localStorage.getItem('user')).split(":")[0],
      password: window.atob(localStorage.getItem('user')).split(":")[1]
    }

    return auth;
  }

  showVolunteerInfo(volunteer) {
    alert(JSON.stringify(volunteer));
  }
}
