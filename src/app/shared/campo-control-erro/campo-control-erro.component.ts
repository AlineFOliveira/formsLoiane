import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  templateUrl: './campo-control-erro.component.html',
  styleUrl: './campo-control-erro.component.scss'
})
export class CampoControlErroComponent {
  @Input() 

  msgErro: string = '';
  @Input() 
  mostrarErro?: boolean = false;

}
