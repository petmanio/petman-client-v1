import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomReviewsListDialogComponent } from './room-reviews-list-dialog.component';

describe('RoomReviewsListDialogComponent', () => {
  let component: RoomReviewsListDialogComponent;
  let fixture: ComponentFixture<RoomReviewsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomReviewsListDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomReviewsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
