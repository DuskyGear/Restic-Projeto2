import {Component, Input} from  '@angular/core' ;
import {MatIconModule} from '@angular/material/icon' ;
import {MatDividerModule} from '@angular/material/divider' ;
import {MatButtonModule} from  '@angular/material/button' ;

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class BotaoComponent {
  @Input({required:true})tipo?:string;

}
