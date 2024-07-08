import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent {

  constructor(private Http: HttpClient){

  }

  usuario: any = {
    nome: '',
    email: '',
    endereco: {
      rua: '',
      cep: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  }
  onSubmit(form: NgForm) {
    console.log(form);
  }

  consultaCEP(event: Event, form:any){
    const inputElement = event.target as HTMLInputElement;//pra pegar o value; fala q o event.target é um htmlinputelement
    let cep = inputElement.value
    cep = cep.replace(/\D/g, '');
    console.log(cep)

    if(cep != ""){
      var validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){//test é para testar se uma string corresponde a uma determinada expressão regular
        this.Http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados:any) => this.populaDadosForm(dados, form))
      }
    }
  }

  populaDadosForm(dados: any, form: NgForm) {
    console.log(dados);

    form.form.patchValue({
      endereco: {
        rua: dados.logradouro || '',
        cep: dados.cep || '',
        complemento: dados.complemento || '',
        bairro: dados.bairro || '',
        cidade: dados.localidade || '',
        estado: dados.uf || ''
      }
    });
  }
}
