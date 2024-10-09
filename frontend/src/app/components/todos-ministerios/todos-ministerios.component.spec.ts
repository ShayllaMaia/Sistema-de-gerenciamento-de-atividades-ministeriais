import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMinisteriosComponent } from './todos-ministerios.component';

describe('TodosMinisteriosComponent', () => {
  let component: TodosMinisteriosComponent;
  let fixture: ComponentFixture<TodosMinisteriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosMinisteriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosMinisteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
