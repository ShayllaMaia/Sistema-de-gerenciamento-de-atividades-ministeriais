import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroListarComponent } from './membro-listar.component';

describe('MembroListarComponent', () => {
  let component: MembroListarComponent;
  let fixture: ComponentFixture<MembroListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
