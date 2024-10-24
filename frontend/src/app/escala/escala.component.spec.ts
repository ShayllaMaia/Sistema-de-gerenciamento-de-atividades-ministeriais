import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaComponent } from './escala.component';

describe('EscalaComponent', () => {
  let component: EscalaComponent;
  let fixture: ComponentFixture<EscalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
