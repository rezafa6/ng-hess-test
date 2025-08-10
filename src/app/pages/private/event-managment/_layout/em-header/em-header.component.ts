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
import { ThemeService } from '../../../../../core/services/theme-service';
ThemeService
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
  theme: 'dark' | 'light' = 'dark';

  constructor(private themeService: ThemeService) {
    setTimeout(() => {
      this.theme = this.themeService.getTheme();
      console.log(this.theme);
    }, 1);
  }

  toggleTheme(): void {
    this.themeService.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
  }

 toggleMobileMenu(): void {
   this.isMobileMenuVisible = !this.isMobileMenuVisible;
 }
}
