import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventManagmentComponent } from './event-managment.component';
import { EventListComponent } from './pages/event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventManagmentComponent,
    children: [
      {
        path: 'event-list',
        component: EventListComponent,
      },
      {
        path: '',
        redirectTo: 'event-list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventManagmentRoutingModule {}
