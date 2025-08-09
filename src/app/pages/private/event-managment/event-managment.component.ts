import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { EmHeaderComponent } from "./_layout/em-header/em-header.component";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const antDesignModules = [
  NzLayoutModule, NzMenuModule, NzIconModule, NzGridModule
]

@Component({
  selector: 'app-event-managment',
  imports: [CommonModule, RouterOutlet , EmHeaderComponent  , ... antDesignModules ],
  providers: [],
  templateUrl: './event-managment.component.html',
  styleUrl: './event-managment.component.scss'
})
export class EventManagmentComponent {}
