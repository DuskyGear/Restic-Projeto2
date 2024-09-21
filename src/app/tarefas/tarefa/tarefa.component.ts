import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './tarefa.model';
import { BotaoComponent } from '../../botao/botao.component';


@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [BotaoComponent],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent {
  @Input({required:true}) task!:Task;

  @Output() completo = new EventEmitter<string>()

  ConcluirTarefa(){
    this.completo.emit(this.task.id)
  }



}
