import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import translationsEN from "../../src/public/i18n/en.json";
import { ThemeService } from './core/services/theme-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {

  constructor(
    private _translate: TranslateService
    , private _themeService: ThemeService
  ) {
    this._translate.setTranslation('en', translationsEN);
    this._translate.setDefaultLang('en');
    const currentTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    this._themeService.setTheme(currentTheme);
  }
}
