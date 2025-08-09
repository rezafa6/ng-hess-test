
import { NgModule } from "@angular/core";
import {SharedModule} from "../../../common/shared.module"
import {EventManagmentRoutingModule} from './event-managment.routes'
import { DrawerService } from "../../../common/services/drawer-service";
import { NzDrawerService } from "ng-zorro-antd/drawer";

@NgModule({
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
