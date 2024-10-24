import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSolicitacoesComponent } from './lista-solicitacoes.component';

describe('ListaSolicitacoesComponent', () => {
  let component: ListaSolicitacoesComponent;
  let fixture: ComponentFixture<ListaSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSolicitacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
