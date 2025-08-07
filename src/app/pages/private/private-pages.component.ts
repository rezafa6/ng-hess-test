import { Component } from "@angular/core";
import { SharedModule } from "../../common/shared.module";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from "@angular/router";
@Component({
  selector: "private-pages",
  imports: [
    SharedModule , NzButtonModule
  ],
  templateUrl: "./private-pages.component.html",
  styleUrl: "./private-pages.component.scss",
  standalone: true,

})
export class PrivatePagesComponent {
 constructor(
  private _router: Router
 ){
  setTimeout(() => {
    this._router.navigateByUrl('/p/event-management')
  } , 150)
 }
}
