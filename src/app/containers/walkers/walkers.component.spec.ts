import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkersComponent } from './walkers.component';

describe('WalkersComponent', () => {
  let component: WalkersComponent;
  let fixture: ComponentFixture<WalkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkersComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
