import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarEntradaComponent } from './solicitar-entrada.component';

describe('SolicitarEntradaComponent', () => {
  let component: SolicitarEntradaComponent;
  let fixture: ComponentFixture<SolicitarEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
