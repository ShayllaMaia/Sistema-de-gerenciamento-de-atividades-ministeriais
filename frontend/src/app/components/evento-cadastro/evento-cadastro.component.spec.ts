import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoCadastroComponent } from './evento-cadastro.component';

describe('EventoCadastroComponent', () => {
  let component: EventoCadastroComponent;
  let fixture: ComponentFixture<EventoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
