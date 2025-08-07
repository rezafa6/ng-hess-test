import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomeConfettiComponent } from './wellcome-confetti.component';

describe('WellcomeConfettiComponent', () => {
  let component: WellcomeConfettiComponent;
  let fixture: ComponentFixture<WellcomeConfettiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellcomeConfettiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellcomeConfettiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
