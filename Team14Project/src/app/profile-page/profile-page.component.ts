import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  data = [
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

  displayedColumns: string[] = ['title', 'location', 'time'];
}
