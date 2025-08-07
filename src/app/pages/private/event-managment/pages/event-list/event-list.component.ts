import { Component } from '@angular/core';
import { MasterTableComponent } from '../../../../../common/components/master-table/master-table.component';
import { ColDefDirective } from '../../../../../common/directives/col-def.directive';
@Component({
  selector: 'app-event-list',
  imports: [MasterTableComponent, ColDefDirective],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
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
}
