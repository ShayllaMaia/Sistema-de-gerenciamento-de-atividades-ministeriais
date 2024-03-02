import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeCadastroComponent } from './atividade-cadastro.component';

describe('AtividadeCadastroComponent', () => {
  let component: AtividadeCadastroComponent;
  let fixture: ComponentFixture<AtividadeCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
