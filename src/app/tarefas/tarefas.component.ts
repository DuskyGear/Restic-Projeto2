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
  url = 'http://localhost:4000/tarefas';
  private intervalId: any;

  @Input({ required: true }) name!: string;
  @Input({ required: true }) IdUsuario!: string;

  adicionandoTarefa: boolean = false;
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarTarefas();
    this.intervalId = setInterval(() => {
      this.carregarTarefas();
    }, 2000); // 2 minutos
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
    }
  }

  carregarTarefas() {
    this.http.get<any[]>(this.url).subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  get SelecionarTarefasUsuario() {
    return this.tasks.filter((tarefa) => tarefa.userId === this.IdUsuario);
  }

  onCompletarTarefa(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe(
      () => {
        this.carregarTarefas(); // Recarrega a lista de tarefas do servidor
      },
      (error) => {
        console.error('Erro ao completar tarefa:', error);
      }
    );
  }
  

  onComecarAdicionarTarefa() {
    this.adicionandoTarefa = true;
  }

  onCancelarAdicionarTarefa() {
    this.adicionandoTarefa = false;
  }

  onAdicionarTarefa(DadosTarefa: DadosNovaTarefa) {
    const novaTarefa = {
      userId: this.IdUsuario,
      titulo: DadosTarefa.titulo,
      sumario: DadosTarefa.sumario,
      dataTarefa: DadosTarefa.data
    };
  
    this.http.post<any>(this.url, novaTarefa).subscribe(
      (response) => {
        this.carregarTarefas(); // Recarrega a lista de tarefas do servidor
        this.adicionandoTarefa = false;
      },
      (error) => {
        console.error('Erro ao adicionar tarefa:', error);
      }
    );
  }
  
}
