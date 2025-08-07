import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmHeaderComponent } from './em-header.component';

describe('EmHeaderComponent', () => {
  let component: EmHeaderComponent;
  let fixture: ComponentFixture<EmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
