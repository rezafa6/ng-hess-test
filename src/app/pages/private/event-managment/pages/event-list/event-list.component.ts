import { AfterViewInit, Component,signal  } from '@angular/core';
import { MasterTableComponent } from '../../../../../common/components/master-table/master-table.component';
import { ColDefDirective } from '../../../../../common/directives/col-def.directive';
import { WellcomeConfettiComponent } from '../../../../../common/components/wellcome-confetti/wellcome-confetti.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AddEditEventModalComponent } from '../common/add-edit-event-modal/add-edit-event-modal.component';

const antDesignModules = [NzButtonModule, NzIconModule , NzModalModule]

@Component({
  selector: 'app-event-list',
  imports: [MasterTableComponent, ColDefDirective, WellcomeConfettiComponent, ...antDesignModules],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements AfterViewInit {

  constructor(private modal: NzModalService) {}

  showConfetti = signal(true);

  tableData = {
    columns: [
      { key: 'name', title: 'Name' },
      { key: 'actions', title: 'Actions' }
    ],
    dataSource: [
      { name: 'John Doe' },
      { name: 'Jane Smith' }
    ]
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showConfetti.set(false);
    }, 1750);
  }

  openCreateModal() {
    const modalRef = this.modal.create({
      nzTitle: 'Create New Event',
      nzContent: AddEditEventModalComponent,
      // nzComponentParams: {
      //   title: 'Create User',
      // },
      nzData: {
        title: 'Create New Event 2'
      },
      nzFooter: null,
      nzWidth: window.innerWidth > 768 ? '50%' : '90%'
    });

    modalRef.afterClose.subscribe(result => {
      if (result) {
        console.log('Created User:', result);
      }
    });
  }
}
