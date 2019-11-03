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

  @ViewChild('eventTable', {
    static: false
  }) eventTable: MatTable < any > ;
  state: Observable < object > ;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params.user);
    }); 

  }

  isVolunteer = false;

  data = [{
      title: 'Mentor event',
      location: 'San Jose',
      time: '6.00pm November 10'
    },
    {
      title: 'School event',
      location: 'San Francisco',
      time: '2.30pm November 17'
    },
    {
      title: 'Mentor event',
      location: 'San Jose',
      time: '6.00pm November 10'
    },
    {
      title: 'School event',
      location: 'San Francisco',
      time: '2.30pm November 17'
    },
    {
      title: 'Mentor event',
      location: 'San Jose',
      time: '6.00pm November 10'
    },
    {
      title: 'School event',
      location: 'San Francisco',
      time: '2.30pm November 17'
    }
  ];

  appName = 'Braven';

  displayedColumns: string[] = ['title', 'location', 'time', 'action'];

  unregister(event) {
    this.data.splice(this.data.indexOf(event), 1);

    this.eventTable.renderRows();
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
