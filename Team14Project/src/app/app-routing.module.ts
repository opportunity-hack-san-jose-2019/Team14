import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AnnouncementPageComponent } from './announcement-page/announcement-page.component'

const routes: Routes = [
  {
    path: '', component: WelcomePageComponent
  },
  {
    path: 'profile', component: ProfilePageComponent
  },
  {
    path: 'admin', component: AdminPageComponent
  },
  {
    path: 'announcement', component: AnnouncementPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
