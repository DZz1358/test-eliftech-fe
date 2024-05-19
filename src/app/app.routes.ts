import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewComponent } from './components/view/view.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'view/:id',
    component: ViewComponent,
  },
  {
    path: 'add-event',
    component: AddEventComponent,
  },
  {
    path: 'dashboard/:id/add-attendee',
    component: RegisterComponent,
  },

];
