import {Component, EventEmitter, Input, Output} from  '@angular/core' ;
import {MatIconModule} from '@angular/material/icon' ;
import {MatDividerModule} from '@angular/material/divider' ;
import {MatButtonModule} from  '@angular/material/button' ;

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class BotaoComponent {
  @Input({required:true})tipo?:string;
  

  @Output() acao = new EventEmitter<void>(); // Um evento para qualquer ação

  executarAcao() {
    this.acao.emit(); // Emite um evento genérico para ser tratado pelo componente pai
  }

  
     // Método para retornar o ícone correto com base no tipo
     getIcone(): string {
      switch (this.tipo) {
        case 'add':
          return 'add'; // Ícone de adicionar
        case 'check':
          return 'check'; // Ícone de deletar
        default:
          return 'help_outline'; // Ícone padrão
      }
    }

}
