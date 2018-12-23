import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarperilComponent } from './modificarperil.component';

describe('ModificarperilComponent', () => {
  let component: ModificarperilComponent;
  let fixture: ComponentFixture<ModificarperilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarperilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarperilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
