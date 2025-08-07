import { AfterViewInit, Component,signal  } from '@angular/core';
import { MasterTableComponent } from '../../../../../common/components/master-table/master-table.component';
import { ColDefDirective } from '../../../../../common/directives/col-def.directive';
import { WellcomeConfettiComponent } from '../../../../../common/components/wellcome-confetti/wellcome-confetti.component';
@Component({
  selector: 'app-event-list',
  imports: [MasterTableComponent, ColDefDirective, WellcomeConfettiComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent implements AfterViewInit {
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
}
