import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerReviewsListDialogComponent } from './walker-reviews-list-dialog.component';

describe('WalkerReviewsListDialogComponent', () => {
  let component: WalkerReviewsListDialogComponent;
  let fixture: ComponentFixture<WalkerReviewsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkerReviewsListDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerReviewsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
