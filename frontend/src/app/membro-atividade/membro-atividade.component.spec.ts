import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroAtividadeComponent } from './membro-atividade.component';

describe('MembroAtividadeComponent', () => {
  let component: MembroAtividadeComponent;
  let fixture: ComponentFixture<MembroAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroAtividadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
