import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  constructor(private modal: NzModalService) {}

  confirm(
    title: string,
    content: string,
    okText: string = 'Yes',
    cancelText: string = 'No'
  ): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const modalRef = this.modal.confirm({
        nzTitle: title,
        nzContent: content,
        nzOkText: okText,
        nzCancelText: cancelText,
        nzOnOk: () => {
          observer.next(true);
          observer.complete();
        },
        nzOnCancel: () => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }
}
