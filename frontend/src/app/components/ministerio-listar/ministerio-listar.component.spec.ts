import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisterioListarComponent } from './ministerio-listar.component';

describe('MinisterioListarComponent', () => {
  let component: MinisterioListarComponent;
  let fixture: ComponentFixture<MinisterioListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinisterioListarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisterioListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
