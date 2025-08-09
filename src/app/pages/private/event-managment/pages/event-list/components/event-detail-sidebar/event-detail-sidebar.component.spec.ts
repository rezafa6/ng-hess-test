import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailSidebarComponent } from './event-detail-sidebar.component';

describe('EventDetailSidebarComponent', () => {
  let component: EventDetailSidebarComponent;
  let fixture: ComponentFixture<EventDetailSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
