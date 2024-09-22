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
  @Output() cancelar = new EventEmitter<void>();
  @Output() add = new EventEmitter<DadosNovaTarefa>();
  entradaTitulo='';
  entradaSumario='';
  entradaData='';

  onCancelarTarefa()
  {
    this.cancelar.emit()
  }
  onEnviando()
  {
    this.add.emit({
      titulo:this.entradaTitulo,
      sumario:this.entradaSumario,
      data:this.entradaData,
    })
    
  }

}
