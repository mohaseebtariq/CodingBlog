import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlNavbarComponent } from './bl-navbar.component';

describe('BlNavbarComponent', () => {
  let component: BlNavbarComponent;
  let fixture: ComponentFixture<BlNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
