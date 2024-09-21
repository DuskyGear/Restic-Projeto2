import { Component, Input, } from '@angular/core';
import {BotaoComponent} from '../botao/botao.component'
import { TarefaComponent } from "./tarefa/tarefa.component";
import {NovaTarefaComponent} from './nova-tarefa/nova-tarefa.component'

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [BotaoComponent, TarefaComponent,NovaTarefaComponent],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {

@Input({required:true}) name !: string;
@Input({required:true}) IdUsuario !: string;

adicionandoTarefa:boolean=false;

tasks = [
  {
    id:'t1',
    userId:'u1',
    titulo:'Primeria Tarefa',
    sumario:'Aprendendo mais com Angular',
    dataTarefa: '2025-01-10'

  },
  {
    id:'t2',
    userId:'u2',
    titulo:'Segunda Tarefa',
    sumario:'Aprendendo mais com Angular Material',
    dataTarefa: '2025-01-10'

  },
  {
    id:'t3',
    userId:'u3',
    titulo:'Primeria Tarefa',
    sumario:'Aprendendo mais com Angular Signal',
    dataTarefa: '2025-01-10'
  }

];

get SelecionarTarefasUsuario(){
  return this.tasks.filter((tarefa) => tarefa.userId=== this.IdUsuario);
}

onCompletarTarefa(id:string)
{
  this.tasks = this.tasks.filter((tarefa) => tarefa.id !== id); // Remove a tarefa
}
 onComecarAdicionarTarefa()
 {
  this.adicionandoTarefa=true;
 }
}
