import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../../../common/shared.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

const antDesignModules = [NzTagModule, NzIconModule , NzGridModule , NzEmptyModule]

@Component({
  selector: 'app-event-detail-sidebar',
  imports: [SharedModule, ...antDesignModules ],
  templateUrl: './event-detail-sidebar.component.html',
  styleUrl: './event-detail-sidebar.component.scss',
  standalone: true
})
export class EventDetailSidebarComponent {
  @Input() data: any;

}
