
import { NgModule } from "@angular/core";
import {SharedModule} from "../../../common/shared.module"
import {EventManagmentRoutingModule} from './event-managment.routes'
import { EventListComponent } from "./pages/event-list/event-list.component";
import { EventManagmentComponent } from "./event-managment.component";
import { DrawerService } from "../../../common/services/drawer-service";
import { NzDrawerService } from "ng-zorro-antd/drawer";
// @NgModule({
//   declarations: [
//     // EmHeaderComponent
//     // EventListComponent
//   ],
//   imports: [
//    SharedModule,
//    EventListComponent,
//    EventManagmentComponent,

//   ],
//   exports: [
//     SharedModule,
//     EventManagmentRoutingModule,

//   ],
//   providers: [
//     DrawerService,
//     NzDrawerService
//   ]
// })
// export class EventManagmentModule {}
@NgModule({
  declarations: [
    // EventListComponent,
    // EventManagmentComponent,
  ],
  imports: [
    SharedModule,
    EventManagmentRoutingModule,
  ],
  exports: [
    SharedModule,
    EventManagmentRoutingModule,
  ],
  providers: [
    DrawerService,
    NzDrawerService,
  ]
})
export class EventManagmentModule {}
