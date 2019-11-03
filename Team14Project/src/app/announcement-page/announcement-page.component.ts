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
  
  @Component({
    selector: 'app-announcement-page',
    templateUrl: './announcement-page.component.html',
    styleUrls: ['./announcement-page.component.css']
  })
  
  export class AnnouncementPageComponent implements OnInit {
  
    @ViewChild('eventTable', {static: false}) eventTable: MatTable < any > ;
    currentUser : Object;
    eventList: [Object]
    displayedColumns: string[] = ['title', 'location', 'description', 'time', 'action'];

    constructor(private router: Router, private userService: UserService) {
      this.eventList = [{
        title: 'event',
        description: 'cool',
        location: 'cali',
        time: 'time'
      }]
    }

    getEvents() {
      Axios.get('https://obscure-badlands-88487.herokuapp.com/event/upcoming')
      .then((events) => {
        this.eventList = events.data;
      }).catch((e) => {
        console.log(e)
      });
    }
  
    ngOnInit() {
      this.userService.getCurrentUser().then((user) => {
        this.currentUser = user
      });

      this.getEvents()
    }
  
    joinEvent(event) {
      console.log(this.currentUser)
      Axios.post('https://obscure-badlands-88487.herokuapp.com/event/join', {
        event_id: event._id, 
        user_role: this.currentUser.vip ? 'volunteers' : 'students', 
        user_email: this.currentUser.email
      })
      .then((events) => {
        this.eventList = events.data;
      }).catch((e) => {
        console.log(e)
      });
    }
  }
  