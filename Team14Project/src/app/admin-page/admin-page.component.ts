import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  @ViewChild('eventTable', {static: false}) eventTable: MatTable<any>;

  constructor(private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
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
    }
  }

  displayedColumns: string[] = ['title', 'location', 'time', 'action'];
}
