import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BotaoComponent } from '../botao/botao.component';
import { TarefaComponent } from "./tarefa/tarefa.component";
import { NovaTarefaComponent } from './nova-tarefa/nova-tarefa.component';
import { DadosNovaTarefa } from '../tarefas/nova-tarefa/nova-tarefa.model';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [BotaoComponent, TarefaComponent, NovaTarefaComponent],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit, OnDestroy {
  url = 'http://localhost:4000/tarefas'; // URL da API de tarefas
  private intervalId: any; // ID do intervalo para atualizações

  @Input({ required: true }) name!: string; // Nome do usuário
  @Input({ required: true }) IdUsuario!: string; // ID do usuário

  adicionandoTarefa: boolean = false; // Estado para controle da adição de tarefas
  tasks: any[] = []; // Array para armazenar tarefas

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarTarefas(); // Carrega tarefas ao iniciar
    this.intervalId = setInterval(() => {
      this.carregarTarefas(); // Atualiza tarefas a cada 2 segundos
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
    }
  }

  carregarTarefas() {
    this.http.get<any[]>(this.url).subscribe(
      (data) => {
        this.tasks = data; // Atualiza o array com dados da API
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error); // Loga erro caso ocorra
      }
    );
  }

  get SelecionarTarefasUsuario() {
    return this.tasks.filter((tarefa) => tarefa.userId === this.IdUsuario); // Filtra tarefas do usuário
  }

  onCompletarTarefa(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(
      () => {
        this.carregarTarefas(); // Recarrega a lista de tarefas após completar
      },
      (error) => {
        console.error('Erro ao completar tarefa:', error); // Loga erro caso ocorra
      }
    );
  }
  
  onComecarAdicionarTarefa() {
    this.adicionandoTarefa = true; // Inicia o processo de adição de tarefa
  }

  onCancelarAdicionarTarefa() {
    this.adicionandoTarefa = false; // Cancela o processo de adição de tarefa
  }

  onAdicionarTarefa(DadosTarefa: DadosNovaTarefa) {
    const novaTarefa = {
      userId: this.IdUsuario, // ID do usuário para a nova tarefa
      titulo: DadosTarefa.titulo, // Título da nova tarefa
      sumario: DadosTarefa.sumario, // Sumário da nova tarefa
      dataTarefa: DadosTarefa.data // Data da nova tarefa
    };
  
    this.http.post<any>(this.url, novaTarefa).subscribe(
      (response) => {
        this.carregarTarefas(); // Recarrega a lista de tarefas após adicionar
        this.adicionandoTarefa = false; // Reseta estado de adição
      },
      (error) => {
        console.error('Erro ao adicionar tarefa:', error); // Loga erro caso ocorra
      }
    );
  }
}
