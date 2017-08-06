import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerApplicationsListComponent } from './walker-applications-list.component';

describe('WalkerApplicationsListComponent', () => {
  let component: WalkerApplicationsListComponent;
  let fixture: ComponentFixture<WalkerApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkerApplicationsListComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
