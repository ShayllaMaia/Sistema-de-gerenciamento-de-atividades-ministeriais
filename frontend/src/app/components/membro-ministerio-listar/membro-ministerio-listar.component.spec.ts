import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroMinisterioListarComponent } from './membro-ministerio-listar.component';

describe('MembroMinisterioListarComponent', () => {
  let component: MembroMinisterioListarComponent;
  let fixture: ComponentFixture<MembroMinisterioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroMinisterioListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroMinisterioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
