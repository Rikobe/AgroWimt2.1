import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagotierraComponent } from './pagotierra.component';

describe('PagotierraComponent', () => {
  let component: PagotierraComponent;
  let fixture: ComponentFixture<PagotierraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagotierraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagotierraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
