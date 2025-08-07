import { Routes } from "@angular/router";
import { EventManagmentComponent } from "./event-managment.component";
import { EventListComponent } from "./pages/event-list/event-list.component";

export const EVENT_MANAGEMENT_ROUTES: Routes = [
  {
    path: "event-management",
    component: EventManagmentComponent,
    children: [
      {
        path: "",
        component: EventListComponent
      }
    ]
  },
];
