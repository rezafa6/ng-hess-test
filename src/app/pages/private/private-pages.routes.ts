import { Routes } from "@angular/router";
import { PrivatePagesComponent } from "./private-pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const PRIVATE_PAGES_ROUTES: Routes = [
  {
    path: "",
    component: PrivatePagesComponent,
    loadChildren: () => import('./event-managment/event-managment.routes').then(m => m.EVENT_MANAGEMENT_ROUTES),
    // children: [
    //   {
    //     // path: "",
    //     // // pathMatch: "full",
    //     // // redirectTo: "dashboard",
    //     // component: DashboardComponent
    //   }
    // ],
  },
];
