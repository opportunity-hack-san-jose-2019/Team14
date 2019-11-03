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
    eventList: []

    constructor(private router: Router, private userService: UserService) {
      this.eventList = []
    }
  
    ngOnInit() {
      this.userService.getCurrentUser().then((user) => {
        console.log(user)
        this.currentUser = user
      });

      Axios.get('https://obscure-badlands-88487.herokuapp.com/event/upcoming')
      .then((events) => {
        console.log(events);
        this.eventList = events.data;
      }).catch((e) => {
        console.log(e)
      })

    }
  
    logOut() {
      this.router.navigateByUrl('/');
    }
  }
  