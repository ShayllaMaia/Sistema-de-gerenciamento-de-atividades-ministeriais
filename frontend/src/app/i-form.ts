import { NgForm } from '@angular/forms';

export interface IForm<T> {
  registro: T;
  submit(form: NgForm): void;
}
