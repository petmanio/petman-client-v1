import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkerAddComponent } from './walker-add.component';

describe('WalkerAddComponent', () => {
  let component: WalkerAddComponent;
  let fixture: ComponentFixture<WalkerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
