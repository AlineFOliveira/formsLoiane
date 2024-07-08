import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.scss',
})
export class DataFormComponent {
  public formulario: FormGroup;
  public estados: EstadoBr[] = [];

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService
  ) {
    //construtor de formulário
    this.formulario = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ], //tamanho minimo 3
      email: ['', [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
    });
  }

  ngOnInit(){
    this.dropdownService.getEstadosBr()
    .subscribe(dados => {this.estados = dados; console.log(this.estados)})
  }

  public onSubmit() {
    //Quando o formulário for enviado
    console.log(this.formulario);

    if (this.formulario.valid) {
      this.http
        .post('https://httpbin.org/post', JSON.stringify(this.formulario.value)) //emular sem ter um servidor pronto
        .subscribe((dados) => {
          console.log(dados);
          this.formulario.reset;
        });
    } else {
      console.log("Formulário inválido")
      this.formulario.markAllAsTouched
      Object.keys(this.formulario.controls).forEach(campo =>{
        console.log(campo)
        const controle = this.formulario.get(campo);
        controle?.markAsDirty
      });
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');

    if (campoEmail!.errors) {
      return campoEmail!.errors['email'] && campoEmail!.touched;
    }
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')!.value;
    cep = cep.replace(/\D/g, '');
    console.log(cep);

    if (cep != '') {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        //test é para testar se uma string corresponde a uma determinada expressão regular
        this.resetaDadosForm();
        this.http
          .get(`//viacep.com.br/ws/${cep}/json`)
          .subscribe((dados) => this.populaDadosForm(dados));
      }
    }
  }
  public populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  public resetaDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}
