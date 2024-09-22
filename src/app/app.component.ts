import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, HeaderComponent, UserComponent, TarefasComponent, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  
  url = 'http://localhost:4000/usuarios'; // URL da API
  usuarios: any[] = []; // Array para armazenar usuários
  selecionarPorid?: string; // ID do usuário selecionado
  private intervalId: any; // ID do intervalo para monitoramento

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsuarios(); // Busca usuários ao iniciar
    this.startMonitoring(); // Inicia o monitoramento da API
  }

  startMonitoring() {
    this.intervalId = setInterval(() => {
      this.fetchUsuarios(); // Atualiza a lista de usuários a cada 2 segundos
    }, 2000);
  }

  fetchUsuarios() {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.usuarios = data; // Atualiza o array com dados da API
    });
  }

  get pegarUsuario() {
    return this.usuarios.find(usuario => usuario.id === this.selecionarPorid)!; // Retorna o usuário selecionado
  }

  onSelectUser(id: string) {
    this.selecionarPorid = id; // Define o usuário selecionado pelo ID
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
  }
}
