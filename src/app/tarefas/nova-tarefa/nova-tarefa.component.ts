import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DadosNovaTarefa } from './nova-tarefa.model';

@Component({
  selector: 'app-nova-tarefa',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nova-tarefa.component.html',
  styleUrl: './nova-tarefa.component.css'
})
export class NovaTarefaComponent {
  @Output() cancelar = new EventEmitter<void>(); // Emite evento para cancelar a adição de tarefa
  @Output() add = new EventEmitter<DadosNovaTarefa>(); // Emite os dados da nova tarefa a serem adicionados

  entradaTitulo = ''; // Armazena o título da nova tarefa
  entradaSumario = ''; // Armazena o sumário da nova tarefa
  entradaData = ''; // Armazena a data da nova tarefa

  onCancelarTarefa() {
    this.cancelar.emit(); // Emite evento de cancelamento
  }

  onEnviando() {
    this.add.emit({
      titulo: this.entradaTitulo, // Envia o título da nova tarefa
      sumario: this.entradaSumario, // Envia o sumário da nova tarefa
      data: this.entradaData, // Envia a data da nova tarefa
    });
  }
}
