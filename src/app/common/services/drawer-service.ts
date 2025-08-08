import { Injectable } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable } from 'rxjs';
// import { DrawerContentComponent } from '../components/drawer-content/drawer-content.component';

interface DrawerConfigs {
  width?: number;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  closable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class DrawerService {
  constructor(private drawerService: NzDrawerService) {}

  open( component: any , title: string, data?: any , configs: DrawerConfigs = {width: 400}): Observable<any> {
    const drawerRef = this.drawerService.create<any, { data: any }, any>({
      nzTitle: title,
      nzContent: component,
      nzContentParams: { data },
      nzPlacement: configs.placement || 'right',
      nzWidth: configs.width || 400,
      nzClosable: configs.closable || true
    });

    return drawerRef.afterClose;
  }
}
