import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosMinisterioComponent } from './membros-ministerio.component';

describe('MembrosMinisterioComponent', () => {
  let component: MembrosMinisterioComponent;
  let fixture: ComponentFixture<MembrosMinisterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembrosMinisterioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembrosMinisterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
