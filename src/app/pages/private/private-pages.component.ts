import { Component } from "@angular/core";
import { SharedModule } from "../../common/shared.module";
import { NzButtonModule } from 'ng-zorro-antd/button';
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
}
