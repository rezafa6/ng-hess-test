import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  setTheme(theme: 'light' | 'dark') {
    const linkEl = document.getElementById('app-theme') as HTMLLinkElement;
    if(theme === 'dark') {
      document.body.classList.add('dark-theme');
      linkEl.href = 'theme/styles/ng-zorro-antd.dark.min.css';
    } else {
      document.body.classList.remove('dark-theme');
      linkEl.href = 'theme/styles/ng-zorro-antd.aliyun.min.css';
    }
      localStorage.setItem('theme', theme);
  }

  getTheme(): 'dark' | 'light' {
    const theme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    return theme;
  }

}
