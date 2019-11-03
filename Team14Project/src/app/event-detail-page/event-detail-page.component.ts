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
    selector: 'app-event-detail-page',
    templateUrl: './event-detail-page.component.html',
    // styleUrls: ['../../styles.css']
  })
  
  export class EventDetailPageComponent implements OnInit {
  
    @ViewChild('eventTable', {static: false}) eventTable: MatTable < any > ;
    currentUser : Object;
    eventList: [Object]
    displayedColumns: string[] = ['round', 'interviewer'];
    currentUser : any
    API = 'https://obscure-badlands-88487.herokuapp.com'
    pairList = [{
        round: 1,
        interviewer: 'Peter'
    },
    {
        round: 2,
        interviewer: 'William'
    }]

    constructor(private router: Router, private userService: UserService) {
      this.eventList = [{
        title: 'event',
        description: 'cool',
        location: 'cali',
        time: 'time'
      }]
      console.log('hello')
      let eventId = this.router.getCurrentNavigation().extras.state.eventId;
      this.userService.getCurrentUser().then((user) => {
          this.currentUser = user
          console.log(eventId)
        this.getInterviewers(eventId)
      });
    }

    ngOnInit() {

    }Í

    getInterviewers(eventId) {
        Axios.get(this.API + `/event/pair?eventId=${eventId}`)
        .then((events) => {
            for (let i = 0; i < events.data.length; i++){
                console.log(events.data[i])
            }
        }).catch((e) => {
            console.log(e)
        });
    }

  }
  