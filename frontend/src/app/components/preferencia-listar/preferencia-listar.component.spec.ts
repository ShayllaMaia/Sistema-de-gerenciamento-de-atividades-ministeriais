import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaListarComponent } from './preferencia-listar.component';

describe('PreferenciaListarComponent', () => {
  let component: PreferenciaListarComponent;
  let fixture: ComponentFixture<PreferenciaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
