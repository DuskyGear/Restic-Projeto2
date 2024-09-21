import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { LISTA_USUARIOS } from './usuarios-db';
import { TarefasComponent } from './tarefas/tarefas.component';
import { NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent,TarefasComponent,NgFor,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  usuarios = LISTA_USUARIOS;
  selecionarPorid?:string;

  get pegarUsuario()
  {
    return this.usuarios.find((usuario)=>usuario.id === this.selecionarPorid)!;
  }


  onSelectUser(id: string){

    this.selecionarPorid = id;
  
  }
}


