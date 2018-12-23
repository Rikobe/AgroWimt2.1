import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineventosComponent } from './admineventos.component';

describe('AdmineventosComponent', () => {
  let component: AdmineventosComponent;
  let fixture: ComponentFixture<AdmineventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmineventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
