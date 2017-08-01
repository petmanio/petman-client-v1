import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomApplicationsListComponent } from './room-applications-list.component';

describe('RoomApplicationsListComponent', () => {
  let component: RoomApplicationsListComponent;
  let fixture: ComponentFixture<RoomApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomApplicationsListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
