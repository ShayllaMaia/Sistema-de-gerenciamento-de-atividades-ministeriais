import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponentz } from '../footer/footer.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FooterComponentz],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

}
