import {
    Component,
    OnInit,
    ViewChild,
    NgModule
  } from '@angular/core';
  
  import {
    MatTable
  } from '@angular/material/table';
  import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
  
  @Component({
    selector: 'app-announcement-page',
    templateUrl: './announcement-page.component.html',
    styleUrls: ['./announcement-page.component.css']
  })
  
  export class AnnouncementPageComponent implements OnInit {
  
    @ViewChild('eventTable', {static: false}) eventTable: MatTable < any > ;
    currentUser : any;
    eventList: [Object]
    displayedColumns: string[] = ['title', 'location', 'description', 'time', 'action'];

    API = "https://obscure-badlands-88487.herokuapp.com";

    constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {
      this.eventList = [{
        title: 'event',
        description: 'cool',
        location: 'cali',
        time: 'time'
      }]
    }

    getEvents() {
      Axios.get(`https://obscure-badlands-88487.herokuapp.com/event/upcoming?email=${this.currentUser.email}`)
      .then((events) => {
        this.eventList = events.data;
      }).catch((e) => {
        console.log(e)
      });
    }
  
    ngOnInit() {
      this.userService.getCurrentUser().then((user) => {
        this.currentUser = user
        this.getEvents()
      });

    }
  
    joinEvent(event) {
      this.eventList.splice(this.eventList.indexOf(event), 1);
      this.eventTable.renderRows();
      Axios.post(this.API + '/event/join', {
        event_id: event._id, 
        user_role: this.currentUser.vip !== undefined ? 'volunteers' : 'students', 
        user_email: this.currentUser.email
      })
      .then((events) => {
        console.log(events);
        this.snackBar.open('Success!', 'OK', {duration: 2000});
      }).catch((e) => {
        console.log(e)
      });
    }
  }
  