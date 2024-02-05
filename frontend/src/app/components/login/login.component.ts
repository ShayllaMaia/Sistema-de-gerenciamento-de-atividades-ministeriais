import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponentz } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FooterComponentz],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
