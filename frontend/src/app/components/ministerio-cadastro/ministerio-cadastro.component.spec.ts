import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisterioCadastroComponent } from './ministerio-cadastro.component';

describe('MinisterioCadastroComponent', () => {
  let component: MinisterioCadastroComponent;
  let fixture: ComponentFixture<MinisterioCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinisterioCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisterioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
