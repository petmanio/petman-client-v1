import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerDetailsComponent } from './walker-details.component';

describe('WalkerDetailsComponent', () => {
  let component: WalkerDetailsComponent;
  let fixture: ComponentFixture<WalkerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
