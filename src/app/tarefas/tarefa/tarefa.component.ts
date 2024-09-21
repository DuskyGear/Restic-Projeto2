import { Component, Input } from '@angular/core';

interface Task {
    id:string,
    userId:string,
    titulo:string,
    sumario:string,
    dataTarefa: string
}

@Component({
  selector: 'app-tarefa',
  standalone: true,
  imports: [],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent {
  @Input({required:true}) task!:Task;

}
