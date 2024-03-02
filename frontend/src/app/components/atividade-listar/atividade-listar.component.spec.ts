import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListarComponent } from './atividade-listar.component';

describe('AtividadeListarComponent', () => {
  let component: AtividadeListarComponent;
  let fixture: ComponentFixture<AtividadeListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadeListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
