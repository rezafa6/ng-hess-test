import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { DatePipe } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
const antDesignModules = [
  NzLayoutModule, NzMenuModule, NzIconModule, NzAvatarModule, NzBadgeModule, NzTagModule, NzButtonModule, NzDrawerModule
  
]
@Component({
  selector: 'app-em-header',
  imports: [... antDesignModules , DatePipe],
  templateUrl: './em-header.component.html',
  styleUrl: './em-header.component.scss'
})
export class EmHeaderComponent {
 public readonly currentDate = new Date();
 isMobileMenuVisible = false;

 toggleMobileMenu(): void {
   this.isMobileMenuVisible = !this.isMobileMenuVisible;
 }
}
