import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSlotDialogComponent } from './available-slot-dialog.component';

describe('AvailableSlotDialogComponent', () => {
  let component: AvailableSlotDialogComponent;
  let fixture: ComponentFixture<AvailableSlotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableSlotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSlotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
