import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal, OnInit } from '@angular/core';
import { MasterTableComponent } from '../../../../../common/components/master-table/master-table.component';
import { ColDefDirective } from '../../../../../common/directives/col-def.directive';
import { WellcomeConfettiComponent } from '../../../../../common/components/wellcome-confetti/wellcome-confetti.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AddEditEventModalComponent } from '../common/add-edit-event-modal/add-edit-event-modal.component';
import { EventService } from '../../../../../common/services/event.service';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { DatePipe } from '@angular/common';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ConfirmService } from '../../../../../common/services/confirm-service';
import { DrawerService } from '../../../../../common/services/drawer-service';
import { EventDetailSidebarComponent } from '../common/event-detail-sidebar/event-detail-sidebar.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { EventModel } from '../../../../../common/models/event.model';
// import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SharedModule } from '../../../../../common/shared.module';

const antDesignModules = [
  NzButtonModule, NzIconModule, NzModalModule,
   NzImageModule, NzSpinModule, NzToolTipModule,
    NzSkeletonModule, NzTagModule, NzEmptyModule,
    NzSwitchModule,
    // NzTabsModule

  ]

@Component({
  selector: 'app-event-list',
  imports: [FormsModule , MasterTableComponent, ColDefDirective, WellcomeConfettiComponent, DatePipe, SharedModule, ...antDesignModules],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',

})
export class EventListComponent implements AfterViewInit, OnInit {

  private _destroy$ = new Subject<void>();
  showOnlyPublic = signal(false);
  showConfetti = signal(true);
  editMode: boolean = false;
  loading = signal(false);
  originalDataSource = []

  tableData = signal({
    columns: [
      { key: 'id', title: 'id', isShow: false },
      { key: 'title', title: 'Name', isShow: true },
      { key: 'startDateTime', title: 'Start Date', isShow: true ,
        sortByDate: (a: any, b: any) =>
          new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
      },
      { key: 'description', title: 'Description', isShow: true },
      { key: 'location', title: 'Location', isShow: true },
      { key: 'isPublic', title: 'Public', isShow: true },
      { key: 'actions', title: 'Actions', isShow: true },
    ],
    dataSource: []
  });

  constructor(
    private _modal: NzModalService,
    private _eventService: EventService,
    private _confirmService: ConfirmService,
    private _drawerService: DrawerService,
    private _message: NzMessageService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showConfetti.set(false);
    }, 1750);
  }

  ngOnInit(): void {
    this.getEventsTableData()
  }

  // #region Get Events Table Data
  getEventsTableData() {
    this._eventService.getMockData()
      .pipe(
        takeUntil(this._destroy$),
        tap(() => this.loading.set(true)),
        delay(1250)
      )
      .subscribe(
        {
          next: (data) => {
            data.events.forEach((event: any, index: number) => {
              const { venue } = event;
              event.isPublic = index % 2 == 0; // * set `public` prop (mock data missed this prop)
              event.location = `${venue.venueName} ${venue.address1} ${venue.city} ${venue.state} ${venue.country} ${venue.postalZip}`;
            });
            // this.tableData.dataSource = data.events;
            this.tableData.update((current: any) => ({
              ...current,
              dataSource: data.events
            }))
            this._destroy$.next();
            this.loading.set(false);
          },
          error: (error) => {
            this._message.error('Failed to fetch events');
          },
          complete: () => {

            this._destroy$.next();
            this.loading.set(false);
          }
        }
      );
  }
  // #endregion

  // #region Delete Event
  deleteEventBtnClicked(id: string) {
    this._confirmService.confirm('Confirm Delete', 'Are you sure you want to delete this event ?')
      .subscribe(result => {
        if (result) {
          this.tableData.update((items: any) => ({
            ...items,
            dataSource: items.dataSource.filter((event: any) => event.id !== id)
          }));
        }
      });
  }
  // #endregion

  // #region Event Info
  eventInfoBtnClicked(rowData: any) {
    this._drawerService.open(EventDetailSidebarComponent,'Event Info', rowData , {
      width: 850
    })
      .subscribe(result => {
        //TODO: can get result from drawer (if needed)
      });
  }
  // #endregion

  // #region Open Create and Edit Modal

  prepareToEditEvent(event: any) {
    const eventData = {
      id: event.id,
      title: event.title,
      description: event.description,
      location: event.location,
      isPublic: event.isPublic,
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime),
      primaryImageUrl: event.primaryImageUrl,
      coverImageUrl: event.coverImageUrl,
    }
    this.editMode = true;
    this.openCreateModal(eventData);
  }
  toggleTheme(): void {
    document.body.classList.toggle('dark');
  }
  openCreateModal(eventData: any = null) {
    const modalRef = this._modal.create({
      nzTitle: this.editMode ? `Edit ${eventData.title} Event` : 'Create New Event',
      nzContent: AddEditEventModalComponent,
      nzData: {
        title: this.editMode ? 'Edit Event' : 'Create New Event',
        data: eventData,
        editMode: this.editMode
      },
      nzFooter: null,
      nzWidth: window.innerWidth > 768 ? '50%' : '90%'
    });

    modalRef.afterClose.subscribe(output => {
      this.editMode = false;
      if (output) {
        const {result , editMode} = output;
        // edit current event
        if(editMode) {
          this.tableData.update((current: any) => ({
            ...current,
            dataSource: current.dataSource.map((event: any) => event.id === eventData.id ? {...result , id: eventData} : event)
          }))
          this._message.success('Event updated successfully');
          return;
        }
        // create new event
        const newEvent : EventModel = {
          title: result.title,
          description: result.description,
          location: result.location,
          isPublic: result.isPublic,
          startDateTime: new Date(result.startDateTime),
          endDateTime: new Date(result.endDateTime),
          primaryImageUrl: result.primaryImageUrl,
          coverImageUrl: result.coverImageUrl,
          tickets: [],
          leads: [],
          status: 'Active',
          organizer: {
            businessName: 'Organizer@name.com',
          }
        }
        this.tableData.update((current: any) => ({
          ...current,
          dataSource: [...current.dataSource, newEvent]
        }))
        this._message.success('Event created successfully');
      }
    });
  }
  // #endregion

  // #region Filter By Public

  filterByPublic() {
    const showPublic = this.showOnlyPublic();
    if (!this.originalDataSource.length) {
      this.originalDataSource = [...this.tableData().dataSource];
    }

    const filteredData = showPublic
      ? this.originalDataSource.filter((item: any) => item.isPublic)
      : [...this.originalDataSource];

    this.tableData.update(current => ({
      ...current,
      dataSource: filteredData
    }));
  }
  //#endregion
  // #region Fallback Image
  fallbackImage: string =
    'data:image/png;base64,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';

}
