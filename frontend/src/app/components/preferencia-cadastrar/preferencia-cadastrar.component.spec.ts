import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenciaCadastrarComponent } from './preferencia-cadastrar.component';

describe('PreferenciaCadastrarComponent', () => {
  let component: PreferenciaCadastrarComponent;
  let fixture: ComponentFixture<PreferenciaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferenciaCadastrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferenciaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
