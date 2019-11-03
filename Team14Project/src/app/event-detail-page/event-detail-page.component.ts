import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Axios from 'axios';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  // styleUrls: ['../../styles.css']
})

export class EventDetailPageComponent implements OnInit {

  @ViewChild('eventTable', {
    static: false
  }) eventTable: MatTable<any>;
  currentUser: Object;
  eventList: [Object]
  displayedColumns: string[] = ['round', 'interviewer'];
  pairList = [{
      round: 1,
      interviewer: 'Peter'
    },
    {
      round: 2,
      interviewer: 'William'
    }
  ]

  constructor(private router: Router, private userService: UserService) {
    this.eventList = [{
      title: 'event',
      description: 'cool',
      location: 'cali',
      time: 'time'
    }]
  }

  ngOnInit() {

  }
}