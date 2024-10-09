import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinisteriosComponent } from './ministerios.component';

describe('MinisteriosComponent', () => {
  let component: MinisteriosComponent;
  let fixture: ComponentFixture<MinisteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinisteriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
