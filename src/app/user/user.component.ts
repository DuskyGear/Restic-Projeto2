
import { Component, EventEmitter, Input, Output } from '@angular/core';


interface User {
    id:string;
    avatar:string;
    name:string;


}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  @Input({required:true}) user!:User;

  @Output() selecionado = new EventEmitter<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }
  onSelectUser() {
    this.selecionado.emit(this.user.id);
  }
}
