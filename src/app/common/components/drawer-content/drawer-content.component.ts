import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-drawer-content',
  imports: [JsonPipe , SharedModule , NzDrawerModule],
  templateUrl: './drawer-content.component.html',
  styleUrl: './drawer-content.component.scss',
  standalone: true
})
export class DrawerContentComponent {
  @Input() data: any;
  constructor(){
    setTimeout(() => {
        console.warn(this.data)
    }, 100);
  }
}
