import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  @Input({required: true}) user!: User; // Recebe o objeto usuário como entrada
  @Input({required: true}) ativo!: boolean; // Recebe o estado de ativação do usuário

  @Output() selecionado = new EventEmitter<string>(); // Emite o ID do usuário selecionado

  get imagePath() {
    return 'assets/users/' + this.user.avatar; // Retorna o caminho da imagem do avatar do usuário
  }

  onSelectUser() {
    this.selecionado.emit(this.user.id); // Emite o ID do usuário ao ser selecionado
  }
}
