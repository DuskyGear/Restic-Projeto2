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
  
  url = 'http://localhost:4000/usuarios';
  usuarios: any[] = [];
  selecionarPorid?: string;
  private intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsuarios();
    this.startMonitoring();
  }

  startMonitoring() {
    this.intervalId = setInterval(() => {
      this.fetchUsuarios();
    }, 2000); // Monitora a API a cada 2 segundos
  }

  fetchUsuarios() {
    this.http.get<any[]>(this.url).subscribe(data => {
      this.usuarios = data;
    });
  }

  get pegarUsuario() {
    return this.usuarios.find(usuario => usuario.id === this.selecionarPorid)!;
  }

  onSelectUser(id: string) {
    this.selecionarPorid = id;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
  }
}
